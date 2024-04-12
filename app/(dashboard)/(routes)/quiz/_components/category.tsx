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
  categoryId: z.enum([
    '32b3df5a-4ae7-467a-a349-b9a6cb1c4cd8',
    '8aef4199-782f-4325-857c-7be5a385e0e9',
  ]),
});

const QuizCategory = ({ options }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: '32b3df5a-4ae7-467a-a349-b9a6cb1c4cd8',
    },
  });
  const router = useRouter();
  const handleSubmit = async (
    values: z.infer<typeof formSchema>,
    categoryId: string
  ) => {
    try {
      console.log(values);
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
        onSubmit={form.handleSubmit((values) =>
          handleSubmit(values, form.getValues().categoryId)
        )}
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
