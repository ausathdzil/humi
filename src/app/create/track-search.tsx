'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export function TrackSearch() {
  const searchParams = useSearchParams();

  return (
    <Form action="/create" className="w-full flex justify-center">
      <label htmlFor="q" className="sr-only">
        Search for a track
      </label>
      <div className="w-full max-w-[500px] relative">
        <Input
          type="text"
          name="q"
          className="peer ps-10 pe-9 text-xs sm:text-sm"
          placeholder="Enter a Spotify track URL or ID..."
          defaultValue={searchParams.get('q') ?? ''}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 peer-disabled:opacity-50">
          <SearchIcon size={16} aria-hidden="true" />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-full transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </Form>
  );
}

export function TrackSearchSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="h-10 max-w-[500px] w-full">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
