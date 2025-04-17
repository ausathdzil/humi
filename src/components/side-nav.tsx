'use client';

import { SignInButton, SignOutButton } from '@/components/auth-components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/lib/better-auth/auth-client';
import { cn } from '@/lib/utils';
import {
  ArchiveIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  SparklesIcon,
  UserRoundIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Drawer } from 'vaul';

const navItems = [
  {
    href: '/create',
    icon: <SparklesIcon />,
    label: 'Generate',
  },
  {
    href: '/',
    icon: <HomeIcon />,
    label: 'Home',
  },
  {
    href: '/about',
    icon: <InfoIcon />,
    label: 'About',
  },
  {
    href: '/faqs',
    icon: <HelpCircleIcon />,
    label: 'FAQs',
  },
];

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleNavigation = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const session = useSession();
  const user = session.data?.user;

  return (
    <Drawer.Root
      direction={isMobile ? 'bottom' : 'right'}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Trigger asChild>
        <Button aria-label="Side Navigation" variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-55 bg-black/40" />
        <Drawer.Content
          className={cn(
            'sm:right-2 sm:top-2 bottom-2 fixed z-60 outline-none w-[240px] sm:w-[310px] flex',
            isMobile && 'w-full p-2'
          )}
          style={
            { '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties
          }
        >
          <div className="bg-background/90 backdrop-blur-sm size-full grow p-5 flex flex-col rounded-3xl">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-bold mb-2">Humi</Drawer.Title>
            </div>
            <div className="grow flex flex-col gap-4">
              <ul className="space-y-2">
                {user && (
                  <>
                    <li>
                      <Button
                        className="w-full justify-start"
                        variant="ghost"
                        asChild
                        size="lg"
                      >
                        <Link href="/profile" onClick={handleNavigation}>
                          <UserRoundIcon />
                          Profile
                        </Link>
                      </Button>
                    </li>
                    <li>
                      <Button
                        className="w-full justify-start"
                        variant="ghost"
                        asChild
                        size="lg"
                      >
                        <Link
                          href="/profile/moodboards"
                          onClick={handleNavigation}
                        >
                          <ArchiveIcon />
                          Saved
                        </Link>
                      </Button>
                    </li>

                    <Separator className="my-4" />
                  </>
                )}

                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    onClick={handleNavigation}
                  />
                ))}
              </ul>
              <div className="grow" />
              {user ? (
                <div className="flex flex-col gap-6">
                  <div className="bg-primary/10 rounded-xl p-4 flex items-center gap-4">
                    <Avatar className="size-12 rounded-md">
                      <AvatarImage src={user.image ?? undefined} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <SignOutButton handleNavigation={handleNavigation} />
                </div>
              ) : (
                <SignInButton />
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function NavItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Button
        className="w-full justify-start"
        variant="ghost"
        asChild
        size="lg"
        onClick={onClick}
      >
        <Link href={href}>
          {icon} {label}
        </Link>
      </Button>
    </li>
  );
}
