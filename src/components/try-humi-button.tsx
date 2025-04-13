'use client';

import { XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Form from 'next/form';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

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
          <Form
            className="w-full flex justify-center"
            action="/moodboard/create"
          >
            <div className="relative w-full max-w-[275px] sm:max-w-[400px] lg:max-w-[475px]">
              <Input
                ref={inputRef}
                type="text"
                name="q"
                className="h-10 pl-10 placeholder:text-sm md:placeholder:text-base"
                placeholder="Enter a Spotify track URL or ID..."
              />

              <button
                type="button"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none close-button"
                onClick={() => setIsInput(false)}
                tabIndex={0}
              >
                <XIcon size={16} />
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
