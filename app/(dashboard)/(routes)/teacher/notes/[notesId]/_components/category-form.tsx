'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Notes } from '@prisma/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryFormProps {
  initialData: Notes;
  notesId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  notesCategoryId: z.enum([
    '0426ccad-b594-4b96-8d3a-e61222aa5c4d',
    '09d2d84a-fc15-4bce-b7f4-30747c66d344',
    '57281a6f-7a0f-48c3-9bd2-7f570156a065',
    '7165d419-c0b0-45fe-b7d8-e710c8438ad4',
    '9c7f47b6-8e0e-4b39-96a4-ef0b9ce10d01',
    'a05512ae-d34b-48e2-9652-0cd46ff1d2a7',
    'dbccd809-073e-415f-a409-851f1c326d01',
  ]),
});

export const CategoryForm = ({
  initialData,
  notesId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const defaultCategoryId =
    initialData.notesCategoryId &&
    Object.values(formSchema.shape.notesCategoryId).find(
      (value: string | null) => value === initialData.notesCategoryId
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notesCategoryId: defaultCategoryId,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(`the values received: ${JSON.stringify(values)}`);
    try {
      await axios.patch(`/api/notes/${notesId}`, values);
      toast.success('notes updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.notesCategoryId
  );

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Notes category
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.notesCategoryId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'No category'}
        </p>
      )}{' '}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='notesCategoryId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Notes Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='select Category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>{' '}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
