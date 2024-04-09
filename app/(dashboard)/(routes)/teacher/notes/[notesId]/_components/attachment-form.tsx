'use client';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Notes } from '@prisma/client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';

interface NotesFormProps {
  initialData: Notes;
  notesId: string;
}

const formSchema = z.object({
  docUrl: z.string().min(1, {
    message: 'File is required',
  }),
});

export const NotesForm = ({ initialData, notesId }: NotesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/notes/${notesId}`, values);
      toast.success('notes updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Upload Notes Here
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.docUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a File
            </>
          )}
          {!isEditing && initialData.docUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit File
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.docUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <FileText className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <iframe
              src={initialData.docUrl}
              className='w-full h-60 rounded-md'
              title='Document Preview'
            ></iframe>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='Notes'
            onChange={(url) => {
              if (url) {
                onSubmit({ docUrl: url });
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
