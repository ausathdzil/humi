'use client';

import { LoaderIcon, Share2Icon, ShareIcon, XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function MorphButton() {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInput && inputRef.current && !isLoading && !showDialog) {
      inputRef.current.focus();
    }
  }, [isInput, isLoading, showDialog]);

  const handleButtonClick = () => {
    setIsInput(true);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        setSubmittedValue(inputValue);
        setInputValue('');
        setIsLoading(false);
        setShowDialog(true);
      }, 500);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (
      showDialog ||
      (e.relatedTarget &&
        (e.relatedTarget as HTMLElement).classList.contains('close-button'))
    ) {
      return;
    }
    handleInputSubmit(e);
  };

  const handleCloseInput = () => {
    setIsInput(false);
    setInputValue('');
  };

  return (
    <>
      {isInput ? (
        <motion.form
          key="input-form"
          className="relative"
          onSubmit={handleInputSubmit}
        >
          <motion.div
            className="relative"
            initial={{ width: '220px' }}
            animate={{ width: '500px' }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={isLoading ? undefined : handleInputBlur}
              disabled={isLoading}
              className={cn('h-10 px-10', isLoading ? 'pr-10 bg-gray-50' : '')}
              placeholder="Enter a track link..."
            />

            <button
              type="button"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none close-button"
              onClick={handleCloseInput}
              tabIndex={0}
            >
              <XIcon size={16} />
            </button>

            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <LoaderIcon className="text-primary animate-spin" size={16} />
              </div>
            )}
          </motion.div>
        </motion.form>
      ) : (
        <Button size="lg" variant="outline" onClick={handleButtonClick}>
          <Image src="/humi.svg" alt="Humi" width={16} height={16} />
          See Humi in Action
        </Button>
      )}

      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open);
          if (!open && inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{submittedValue}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">
              <Share2Icon size={16} />
              Share
            </Button>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
