'use client';

import axios from 'axios';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useConfettiStore } from '@/hooks/use-confetti-store';

interface ActionsProps {
  disabled: boolean;
  notesId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, notesId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/notes/${notesId}/unpublish`);
        toast.success('Notes unpublished');
      } else {
        await axios.patch(`/api/notes/${notesId}/publish`);
        toast.success('Notes published');
        confetti.onOpen();
        setTimeout(() => {
          router.push('/teacher/notes');
        }, 1000);
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/notes/${notesId}`);
      toast.success('notes deleted');
      router.refresh();
      router.push(`/teacher/notes`);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant='outline'
        size='sm'
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  );
};
