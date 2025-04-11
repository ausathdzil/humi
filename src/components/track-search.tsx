'use client';

import { Input } from '@/components/ui/input';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export default function TrackSearch() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  return (
    <Form className="w-full flex justify-center" action="/moodboard/create">
      <Input
        type="text"
        name="q"
        className="h-10 max-w-[500px]"
        placeholder="Enter a Spotify track URL or ID..."
        defaultValue={q ?? ''}
      />
    </Form>
  );
}
