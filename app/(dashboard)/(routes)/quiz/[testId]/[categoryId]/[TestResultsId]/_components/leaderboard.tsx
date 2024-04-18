'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { DataTable } from './datatable';

interface LeaderboardProps {
  data: {
    id: string;
    testId: string;
    userId: string;
    categoryId: string;
    accuracy: number;
    Email: string;
    testAttemptId: string;
    score: number;
    TestDuration: number;
  };
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  interface CellData {
    id: string;
    testId: string;
    userId: string;
    categoryId: string;
    accuracy: number;
    Email: string;
    testAttemptId: string;
    score: number;
    TestDuration: number;
  }
  const columns: ColumnDef<CellData>[] = [
    {
      accessorKey: 'Email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            User
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{row.original.Email}</span>;
      },
    },
    {
      accessorKey: 'categoryId',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Test Category
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const categoryId = row.original.categoryId;
        return (
          <span>
            {categoryId === '80c6e42b-5e81-4660-8eeb-3d939fa5a20e'
              ? 'Data Structures & Algorithms'
              : 'JavaScript'}
          </span>
        );
      },
    },
    {
      accessorKey: 'score',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Test Score
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{row.original.score}</span>;
      },
    },
    {
      accessorKey: 'accuracy',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Test Accuracy
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{row.original.accuracy + '%'}</span>;
      },
    },
    {
      accessorKey: 'TestDuration',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Test Duration
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{row.original.TestDuration + 's'}</span>;
      },
    },
  ];

  return <DataTable columns={columns} data={[data]} />;
};

export default Leaderboard;
