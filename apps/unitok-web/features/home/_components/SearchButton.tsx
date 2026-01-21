'use client';

import { Button } from '@intern-3b/shadcn';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.replace('/search')}
      aria-label="Хайх"
      className="cursor-pointer"
    >
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default SearchButton;
