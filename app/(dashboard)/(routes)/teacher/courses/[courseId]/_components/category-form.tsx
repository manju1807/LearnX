'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';

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
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.enum([
    '8707428a-9b36-426e-b422-bed69ff30ede',
    'cdb911ee-f142-4271-aa7f-07b7fa07aa39',
    '3a6ea5c1-993c-4b72-b78a-1927e5f67217',
    'af0bcb06-b03f-4943-b402-118ee3a8fc13',
    'd9c73988-a7ee-4143-bab2-73c6f4f56507',
    '0d4a5883-cfa5-4f58-a50c-322613899e6d',
    '5642daf9-09bb-4997-93ed-161f784a1310',
    'fcebcfd2-04b0-48ae-8282-638c8038e3e9',
    '4366da85-b4d6-4ca8-acb0-e81fadd58ee3',
    'c958b9a7-9d99-4416-878f-b557237cd327',
    '0687101e-5c28-44ba-b5ec-8b1729ad4ba3',
    '921dc0fd-2cd7-4e45-8a4f-efe8c8c095bb',
    'c9c78b06-2a20-4bf5-a622-80d0acca5be0',
    '5e4b329b-116e-4cf4-8386-8f5155a10ed5',
    '757cf854-da89-4a4c-a1a5-6fa4becc8082',
  ]),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const defaultCategoryId =
    initialData.categoryId &&
    Object.values(formSchema.shape.categoryId).find(
      (value: string | null) => value === initialData.categoryId
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: defaultCategoryId,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(`the values received: ${JSON.stringify(values)}`);
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course category
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
            !initialData.categoryId && 'text-slate-500 italic'
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
              name='categoryId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
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
