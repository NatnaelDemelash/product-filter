'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { QueryResult } from '@upstash/vector';
import axios from 'axios';
import { ArrowDownNarrowWideIcon, Filter } from 'lucide-react';
import { useState } from 'react';
import { Product } from './db';

const SORT_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: 'none',
  });

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await axios.post<Product[]>(
          'https://localhost:3000/api/products',
          { filter: { sort: filter.sort } }
        );
        return data;
      } catch (err) {
        throw new Error('Error fetching products');
      }
    },
  });

  console.log(products);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-3xl tracking-tighter font-bold text-slate-900">
          High Quality Cotton Selection
        </h1>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <span className="mr-1">sort</span>
              <ArrowDownNarrowWideIcon className="w-5 h-5 -mr-1 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORT_OPTIONS.map((option) => (
                <button
                  className={cn('text-left w-full px-4 py-2 block text-xs', {
                    'text-gray-900 font-semibold bg-gray-100':
                      option.value === filter.sort,
                    'text-gray-500': option.value !== filter.sort,
                  })}
                  key={option.value}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
