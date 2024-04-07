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
    id: '8707428a-9b36-426e-b422-bed69ff30ede',
    name: 'Data Structures & Algorithm',
  },
  { id: 'cdb911ee-f142-4271-aa7f-07b7fa07aa39', name: 'Django' },
  {
    id: '3a6ea5c1-993c-4b72-b78a-1927e5f67217',
    name: 'Full stack Development',
  },
  { id: 'af0bcb06-b03f-4943-b402-118ee3a8fc13', name: 'Golang' },
  { id: 'd9c73988-a7ee-4143-bab2-73c6f4f56507', name: 'HTML & CSS' },
  { id: '0d4a5883-cfa5-4f58-a50c-322613899e6d', name: 'Java' },
  { id: '5642daf9-09bb-4997-93ed-161f784a1310', name: 'Javascript' },
  { id: 'fcebcfd2-04b0-48ae-8282-638c8038e3e9', name: 'Kotlin' },
  { id: '4366da85-b4d6-4ca8-acb0-e81fadd58ee3', name: 'MERN Stack' },
  { id: 'c958b9a7-9d99-4416-878f-b557237cd327', name: 'NextJS' },
  { id: '0687101e-5c28-44ba-b5ec-8b1729ad4ba3', name: 'Nodejs' },
  { id: '921dc0fd-2cd7-4e45-8a4f-efe8c8c095bb', name: 'Programming' },
  { id: 'c9c78b06-2a20-4bf5-a622-80d0acca5be0', name: 'Python' },
  { id: '5e4b329b-116e-4cf4-8386-8f5155a10ed5', name: 'ReactJS' },
  { id: '757cf854-da89-4a4c-a1a5-6fa4becc8082', name: 'Web development' },
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
