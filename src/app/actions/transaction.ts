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

export async function seedMockTransactions() {
  const membership = await getHouseholdContext();
  if (!membership) return { error: 'Unauthorized' };

  // 1. Ensure categories exist
  const categoryNames = ['Housing', 'Food', 'Transport', 'Education', 'Shopping', 'Health', 'Lifestyle', 'Other'];
  const categories = await Promise.all(
    categoryNames.map(async name => {
      return await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name, isDefault: true }
      });
    })
  );
  
  const catMap = categories.reduce((acc, cat) => ({ ...acc, [cat.name]: cat.id }), {} as Record<string, string>);

  // 2. Clear existing transactions for this household
  await prisma.transaction.deleteMany({
    where: { householdId: membership.householdId }
  });

  // 3. Create mock transactions
  const currentDate = new Date();
  const mockTx = [
    { amount: 12000, categoryId: catMap['Housing'], description: 'Rent', type: 'EXPENSE' },
    { amount: 2400, categoryId: catMap['Housing'], description: 'Electricity', type: 'EXPENSE' },
    { amount: 7400, categoryId: catMap['Food'], description: 'Groceries & Dining', type: 'EXPENSE' },
    { amount: 8000, categoryId: catMap['Education'], description: 'School Fees', type: 'EXPENSE' },
    { amount: 4200, categoryId: catMap['Transport'], description: 'Fuel & Cabs', type: 'EXPENSE' },
    { amount: 6100, categoryId: catMap['Shopping'], description: 'Amazon & Mall', type: 'EXPENSE' },
    { amount: 5500, categoryId: catMap['Other'], description: 'Miscellaneous', type: 'EXPENSE' },
    { amount: 67000, categoryId: null, description: 'Combined Salary Income', type: 'INCOME' },
  ];

  await Promise.all(
    mockTx.map(tx => prisma.transaction.create({
      data: {
        ...tx,
        date: currentDate,
        userId: membership.userId,
        householdId: membership.householdId,
        visibility: 'HOUSEHOLD',
      }
    }))
  );

  revalidatePath('/app/transactions');
  revalidatePath('/app/dashboard');
  revalidatePath('/app/coach');
}

