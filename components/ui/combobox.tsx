import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Category {
  id: string;
  name: string;
}

interface ComboboxProps {
  value: string;
  onChange: (categoryId: string) => void;
}

const categories: Category[] = [
  {
    id: '82d67d17-a996-4b67-a583-6500aaf31cb4',
    name: 'Data Structures & Algorithm',
  },
  { id: '7e645c55-6af1-4410-b17d-605d83404dfe', name: 'Django' },
  {
    id: 'd761fa52-5379-4b97-832e-911a40a7c8af',
    name: 'Full stack Development',
  },
  { id: '35934034-f6b5-43ec-aaeb-b1d8d1fe9acf', name: 'Golang' },
  { id: '1de1481f-33dd-4a32-a8a9-9c6dff320908', name: 'HTML & CSS' },
  { id: 'fffe03cf-ac4b-42a8-9dcc-564157bbcf4b', name: 'Java' },
  { id: '0bed575f-764e-4db6-be73-ed7b60adc03c', name: 'Javascript' },
  { id: '9bbbebf4-95e7-46c5-8ef9-7265a69c1270', name: 'Kotlin' },
  { id: 'b99a770d-ce12-4d86-a371-f5cb670718d7', name: 'MERN Stack' },
  { id: 'dbeba8e4-8578-40c2-91a1-4858565182b8', name: 'NextJS' },
  { id: 'daba9190-0f2d-4a20-b21f-bbbd4654dc98', name: 'Nodejs' },
  { id: 'c4494169-18b0-455d-be2a-b47a463bc7a2', name: 'Programming' },
  { id: 'b962f074-d08f-4ba2-8f71-4e776b0599ea', name: 'Python' },
  { id: '3e65548b-15ae-4226-9b75-2be05ff60467', name: 'ReactJS' },
  { id: 'f0eb394a-1b33-42eb-b20e-dd2d8511820d', name: 'Web development' },
];

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  const handleSelect = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? categories.find((category) => category.id === value)?.name
            : 'Select category...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search category...' className='h-9' />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.id}
                onSelect={handleSelect}
              >
                {category.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === category.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
