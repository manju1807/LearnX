'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface Props {
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.union([z.string(), z.null()]),
});

const QuizCategory = ({ options }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: '',
    },
  });
  const router = useRouter();
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const categoryId = values.categoryId || '';
      const res = await axios.post(`/api/quiz/${categoryId}`, values);
      toast.success('Test Created Successfully!');
      router.push(`/quiz/${res.data.id}/${res.data.categoryId}`);
    } catch (error: any) {
      console.log('error:', error.message);
      toast.error('Something went wrong');
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
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
                <FormLabel>Choose Quiz Category</FormLabel>
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
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className='flex items-center gap-x-2'>
          <Button disabled={!isValid || isSubmitting} type='submit'>
            Take Quiz
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuizCategory;
