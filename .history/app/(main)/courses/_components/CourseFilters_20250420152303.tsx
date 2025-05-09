"use client"

import { useState, useEffect, useTransition, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { debounce } from 'lodash';

type Category = {
  id: string;
  name: string;
};

interface CourseFiltersProps {
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function CourseFilters({
  categories,
  initialCategory = 'all',
  initialSearch = ''
}: CourseFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Create a new URLSearchParams instance
  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Update the search params
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    startTransition(() => {
      // Update the URL
      const query = createQueryString({
        category: value === 'all' ? '' : value,
        search: searchQuery
      });
      router.push(`/courses?${query}`, { scroll: false });
    });
  };

  // Debounced search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      startTransition(() => {
        const query = createQueryString({
          category: selectedCategory === 'all' ? '' : selectedCategory,
          search: value || ''
        });
        router.push(`/courses?${query}`, { scroll: false });
      });
    }, 500),
    [createQueryString, router, selectedCategory]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className={`flex flex-col md:flex-row gap-4 mb-10 ${isPending ? 'opacity-70' : ''}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 w-full rounded-full border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="w-full md:w-[220px]">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full rounded-full border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
