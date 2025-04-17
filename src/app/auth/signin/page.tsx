'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithEmail } from '@/lib/action';
import { EyeIcon, EyeOffIcon, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg sm:text-2xl font-bold text-center">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-center font-semibold">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              disabled={isPending}
              defaultValue={state?.inputs?.email}
            />
            {state?.fieldErrors && (
              <p className="font-semibold text-xs sm:text-sm text-destructive">
                {state.fieldErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                className="pe-9"
                placeholder="Password"
                type={isVisible ? 'text' : 'password'}
                disabled={isPending}
              />
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>
            {state?.fieldErrors && (
              <p className="font-semibold text-xs sm:text-sm text-destructive">
                {state.fieldErrors.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <LoaderIcon className="animate-spin" />}
            Sign In
          </Button>
          {state?.error && (
            <p className="font-semibold text-sm text-destructive">
              {state.error}
            </p>
          )}
          <p className="font-semibold text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
