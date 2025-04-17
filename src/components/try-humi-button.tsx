'use client';

import { ArrowRightIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Form from 'next/form';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const useMobileVariants = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = {
    initial: {
      mobile: { width: '100%' },
      desktop: { width: '220px' },
    },
    animate: {
      mobile: { width: '100%' },
      desktop: { width: '475px' },
    },
    exit: {
      mobile: { width: '100%', opacity: 0 },
      desktop: { width: '220px', opacity: 0 },
    },
  };

  return {
    initial: variants.initial[isMobile ? 'mobile' : 'desktop'],
    animate: variants.animate[isMobile ? 'mobile' : 'desktop'],
    exit: variants.exit[isMobile ? 'mobile' : 'desktop'],
  };
};

export default function TryHumiButton() {
  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const variants = useMobileVariants();

  return (
    <AnimatePresence mode="wait">
      {isInput ? (
        <motion.div
          key="input"
          className="relative w-full"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 40,
            mass: 0.5,
          }}
          onAnimationComplete={() => {
            if (isInput && inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <Form className="w-full flex justify-center" action="/create">
            <div className="w-full max-w-[275px] sm:max-w-[400px] lg:max-w-[475px] relative">
              <Input
                ref={inputRef}
                type="text"
                name="q"
                className="peer ps-9 pe-9 text-xs sm:text-sm"
                placeholder="Enter a Spotify track URL or ID..."
              />
              <button
                type="button"
                className="text-muted-foreground/80 absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 hover:text-primary"
                onClick={() => setIsInput(false)}
                tabIndex={0}
              >
                <XIcon size={16} />
              </button>
              <button
                className="text-muted-foreground/80 hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </Form>
        </motion.div>
      ) : (
        <motion.div
          key="button"
          className="w-full flex justify-center"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 40,
            mass: 0.5,
          }}
        >
          <Button size="lg" variant="outline" onClick={() => setIsInput(true)}>
            <Image src="/humi.svg" alt="Humi" width={16} height={16} />
            See Humi in Action
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
