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
  notesCategoryId: z.union([z.string(), z.null()]),
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
