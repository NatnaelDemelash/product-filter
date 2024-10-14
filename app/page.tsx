'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ArrowDownNarrowWideIcon } from 'lucide-react';
import { useState } from 'react';

const SORT_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: 'none',
  });

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
                    'text-gray-900 font-semibold bg-blue-100':
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
        </div>
      </div>
    </main>
  );
}
