/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Button } from '@/components/ui/button';
import { deleteMoodboard } from '@/db/action';
import { LoaderIcon, TrashIcon } from 'lucide-react';
import { useActionState } from 'react';

export default function DeleteMoodboard({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const deleteMoodboardWithUserId = deleteMoodboard.bind(null, userId);
  const [state, formAction, isPending] = useActionState(
    deleteMoodboardWithUserId,
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button variant="destructive" type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="animate-spin" /> : <TrashIcon />}
        Delete
      </Button>
    </form>
  );
}
