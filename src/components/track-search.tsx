'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function TrackSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params}`);
  }, 500);

  return (
    <div className="w-full flex justify-center">
      <label htmlFor="q" className="sr-only">
        Search for a track
      </label>
      <Input
        type="text"
        name="q"
        className="h-10 max-w-[500px]"
        placeholder="Enter a Spotify track URL or ID..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q') ?? ''}
      />
    </div>
  );
}
