import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    // 1. Create a dummy demo user
    const demoEmail = `demo_${Date.now()}@fintrack.example.com`;
    
    const user = await prisma.user.create({
      data: {
        name: 'Rajesh Sharma (Demo)',
        email: demoEmail,
        password: 'demo_password', // In a real app this would be hashed, but it's a throwaway demo account
      },
    });

    // 2. Create the Sharma Family Household
    const household = await prisma.household.create({
      data: {
        name: 'Sharma Family',
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
    });

    // 3. Create demo data (Categories, Income, Transactions)
    // Categories
    const categories = ['Housing', 'Food', 'Transport', 'Education', 'Shopping', 'Health', 'Lifestyle', 'Other'];
    const createdCategories = await Promise.all(
      categories.map(name => prisma.category.create({ data: { name, isDefault: true } }))
    );

    const catMap = createdCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: cat.id }), {} as Record<string, string>);

    // Income Sources
    await prisma.incomeSource.create({
      data: {
        householdId: household.id,
        name: "Rajesh's Salary",
        amount: 45000,
        frequency: 'Monthly'
      }
    });

    await prisma.incomeSource.create({
      data: {
        householdId: household.id,
        name: "Priya's Salary",
        amount: 33000,
        frequency: 'Monthly'
      }
    });

    // Transactions for the current month
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
          userId: user.id,
          householdId: household.id,
          visibility: 'HOUSEHOLD',
        }
      }))
    );

    // Goal
    await prisma.goal.create({
      data: {
        householdId: household.id,
        name: 'Emergency Fund',
        targetAmount: 100000,
        currentAmount: 42000,
        targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      }
    });

    // 4. Log the user in
    await createSession(user.id);

    return NextResponse.redirect(new URL('/app/dashboard', request.url));
  } catch (error) {
    console.error('Demo Setup Error:', error);
    return NextResponse.json({ error: 'Failed to create demo household' }, { status: 500 });
  }
}
