'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/db';
import { getHouseholdContext } from './household';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function askVoiceCoach(audioBase64: string, history: any[]) {
  const membership = await getHouseholdContext();
  if (!membership) {
    return { error: 'Unauthorized' };
  }

  // Fetch household context
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const transactions = await prisma.transaction.findMany({
    where: {
      householdId: membership.householdId,
      date: { gte: currentMonthStart }
    },
    include: { category: true },
    orderBy: { date: 'desc' },
    take: 50
  });

  const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const spent = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const recentTransactionsStr = transactions.slice(0, 10).map(t => 
    `- ${t.date.toISOString().split('T')[0]}: ${t.type === 'INCOME' ? '+' : '-'}${formatINR(t.amount)} for ${t.category?.name || 'Uncategorized'} (${t.description || 'No desc'})`
  ).join('\n');

  const systemInstruction = `
You are FinTrack AI, a helpful, friendly household financial coach for Indian families.
You have access to the user's live database context:
- Total Income this month: ${formatINR(income)}
- Total Spent this month: ${formatINR(spent)}
- Available (Income - Spent): ${formatINR(income - spent)}

Recent transactions this month:
${recentTransactionsStr}

Instructions:
- Keep your answers concise, empathetic, and actionable.
- Formulate your responses based ONLY on the provided financial context.
- Use simple markdown for formatting.
- If the user asks if they can afford something, calculate it against their Available cash.
`;

  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
    systemInstruction,
  });

  try {
    const chatHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // If there is audio, we append it to the current turn. We don't start a chat session if there's audio,
    // we use generateContent since we are passing multimodal data.
    // Wait, generative-ai SDK supports passing history + multimodal data in generateContent.
    const contents = [...chatHistory];
    
    // Add the user's latest multimodal message
    contents.push({
      role: 'user',
      parts: [
        {
          inlineData: {
            data: audioBase64.split(',')[1], // remove data:audio/webm;base64, prefix if present
            mimeType: 'audio/webm' // Or whatever the browser records. We'll default to audio/webm
          }
        }
      ]
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    return { success: true, text };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return { error: 'Failed to process audio with Gemini AI. ' + error.message };
  }
}
