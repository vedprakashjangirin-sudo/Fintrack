'use server';

import { prisma } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !name) {
    return { error: 'Missing required fields' };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id);
  redirect('/onboarding/household-setup');
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Missing required fields' };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return { error: 'Invalid credentials' };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { error: 'Invalid credentials' };
  }

  await createSession(user.id);
  
  // Check if user has a household
  const householdMember = await prisma.householdMember.findFirst({
    where: { userId: user.id },
  });

  if (householdMember) {
    redirect('/app/dashboard');
  } else {
    redirect('/onboarding/household-setup');
  }
}

export async function logout() {
  await deleteSession();
  redirect('/auth/login');
}
