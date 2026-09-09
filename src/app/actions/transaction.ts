'use server';

import { prisma } from '@/lib/db';
import { getHouseholdContext } from './household';
import { revalidatePath } from 'next/cache';

export async function addTransaction(prevState: any, formData: FormData) {
  const membership = await getHouseholdContext();
  if (!membership) return { error: 'Unauthorized' };

  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as string;
  const categoryId = formData.get('categoryId') as string;
  const description = formData.get('description') as string;
  const dateStr = formData.get('date') as string;
  const visibility = formData.get('visibility') as string || 'HOUSEHOLD';

  if (!amount || isNaN(amount) || amount <= 0) {
    return { error: 'Valid amount is required' };
  }
  if (!type || !dateStr) {
    return { error: 'Missing required fields' };
  }

  await prisma.transaction.create({
    data: {
      amount,
      type,
      categoryId: categoryId || null,
      description,
      date: new Date(dateStr),
      userId: membership.userId,
      householdId: membership.householdId,
      visibility,
    },
  });

  revalidatePath('/app/transactions');
  revalidatePath('/app/dashboard');
  
  return { success: true };
}

export async function deleteTransaction(transactionId: string) {
  const membership = await getHouseholdContext();
  if (!membership) return { error: 'Unauthorized' };

  await prisma.transaction.delete({
    where: {
      id: transactionId,
      householdId: membership.householdId, // enforce household isolation
    },
  });

  revalidatePath('/app/transactions');
  revalidatePath('/app/dashboard');
}
