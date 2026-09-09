'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function createHousehold(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || !session.userId) {
    redirect('/auth/login');
  }

  const name = formData.get('name') as string;
  if (!name) return { error: 'Household name is required' };

  // Create household and make user the OWNER
  await prisma.household.create({
    data: {
      name,
      members: {
        create: {
          userId: session.userId,
          role: 'OWNER',
        },
      },
    },
  });

  redirect('/app/dashboard');
}

export async function getHouseholdContext() {
  const session = await getSession();
  if (!session || !session.userId) return null;

  const membership = await prisma.householdMember.findFirst({
    where: { userId: session.userId },
    include: {
      household: {
        include: {
          members: {
            include: { user: true }
          }
        }
      },
      user: true,
    },
  });

  return membership;
}
