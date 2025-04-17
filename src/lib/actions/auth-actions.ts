/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { signIn, signUp } from '@/lib/better-auth/auth';
import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(1, { message: 'Password is required' }),
});

export async function signInWithEmail(prevState: any, formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = SignInSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      inputs: rawFormData,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const error = await signIn(email, password);

    if (error) {
      throw new Error(error.body?.message);
    }

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

const SignUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50, {
    message: 'Must be less than 50 characters',
  }),
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
    .regex(/[0-9]/, { message: 'Contain at least one number' })
    .trim(),
});

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = SignUpSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      inputs: rawFormData,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const error = await signUp(email, password, name);

    if (error) {
      throw new Error(error.body?.message);
    }

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
