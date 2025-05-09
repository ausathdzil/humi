'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from '@/lib/better-auth/auth-client';
import { cn } from '@/lib/utils';
import { ArchiveIcon, LoaderIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SVGProps, useState } from 'react';

export function AuthInfo() {
  const session = useSession();

  return session.data ? (
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="hidden sm:block text-lg font-bold">
        👋 Hey, {session.data.user.name}
      </span>
      <Button aria-label="Profile" variant="ghost" size="icon" asChild>
        <Link href="/profile/moodboards">
          <ArchiveIcon />
        </Link>
      </Button>
    </div>
  ) : (
    <div className="hidden sm:flex items-center justify-end gap-4">
      <Button variant="secondary" asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup">Get Started</Link>
      </Button>
    </div>
  );
}

export function SignOutButton({
  handleNavigation,
}: {
  handleNavigation?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <Button
      size="lg"
      disabled={loading}
      variant="destructive"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onRequest: () => {
              setLoading(true);
            },
            onSuccess: () => {
              router.push('/');
              setLoading(false);
              handleNavigation?.();
            },
          },
        });
      }}
    >
      {loading ? <LoaderIcon className="animate-spin" /> : <LogOutIcon />}
      Sign Out
    </Button>
  );
}

export function SignInWithSpotify({
  className,
}: {
  className?: React.ComponentProps<typeof Button>['className'];
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className={cn('bg-green-600 hover:bg-green-600/90 text-white', className)}
      size="lg"
      disabled
      onClick={async () => {
        await signIn.social(
          {
            provider: 'spotify',
            callbackURL: '/profile/moodboards',
            errorCallbackURL: '/error',
          },
          {
            onRequest: () => {
              setLoading(true);
            },
            onResponse: () => {
              setLoading(false);
            },
          }
        );
      }}
    >
      {loading ? <LoaderIcon className="animate-spin" /> : <Spotify />}
      Sign In with Spotify
    </Button>
  );
}

const Spotify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
      fill="currentColor"
    />
  </svg>
);
