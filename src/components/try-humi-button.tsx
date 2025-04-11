'use client';

import { XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Form from 'next/form';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TryHumiButton() {
  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInput]);

  return isInput ? (
    <motion.div
      className="relative w-full"
      initial={{ width: '220px' }}
      animate={{ width: '500px' }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <Form className="w-full flex justify-center" action="/moodboard/create">
        <div className="relative w-full max-w-[275px] md:max-w-[400px] lg:max-w-[475px]">
          <Input
            ref={inputRef}
            type="text"
            name="q"
            className="h-10 px-10 placeholder:text-xs md:placeholder:text-base"
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
    <Button size="lg" variant="outline" onClick={() => setIsInput(true)}>
      <Image src="/humi.svg" alt="Humi" width={16} height={16} />
      See Humi in Action
    </Button>
  );
}
