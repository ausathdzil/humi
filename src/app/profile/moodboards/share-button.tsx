'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { baseUrl } from '@/lib/utils';
import { CheckIcon, CopyIcon, ShareIcon } from 'lucide-react';
import type { SVGProps } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonProps {
  moodboardId: string;
}

export function ShareButton({ moodboardId }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${baseUrl}/moodboards/${moodboardId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const handleShareOnX = () => {
    const text = 'Check out my moodboard!';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareOnBluesky = () => {
    const text = 'Check out my moodboard!';
    const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(
      `${text} ${shareUrl}`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShareIcon
            className={`transition-all duration-300 ${
              isCopied ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            }`}
          />
          <CheckIcon
            className={`absolute transition-all duration-300 text-green-500 ${
              isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={handleCopy}>
          <CopyIcon />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareOnX}>
          <Twitter />
          Share on X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareOnBluesky}>
          <Bluesky />
          Share on Bluesky
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Twitter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 1200 1227"
    {...props}
  >
    <path
      fill="#000"
      d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
    />
  </svg>
);

const Bluesky = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 226"
    {...props}
  >
    <path
      fill="#1185FE"
      d="M55.491 15.172c29.35 22.035 60.917 66.712 72.509 90.686 11.592-23.974 43.159-68.651 72.509-90.686C221.686-.727 256-13.028 256 26.116c0 7.818-4.482 65.674-7.111 75.068-9.138 32.654-42.436 40.983-72.057 35.942 51.775 8.812 64.946 38 36.501 67.187-54.021 55.433-77.644-13.908-83.696-31.676-1.11-3.257-1.63-4.78-1.637-3.485-.008-1.296-.527.228-1.637 3.485-6.052 17.768-29.675 87.11-83.696 31.676-28.445-29.187-15.274-58.375 36.5-67.187-29.62 5.041-62.918-3.288-72.056-35.942C4.482 91.79 0 33.934 0 26.116 0-13.028 34.314-.727 55.491 15.172Z"
    />
  </svg>
);
