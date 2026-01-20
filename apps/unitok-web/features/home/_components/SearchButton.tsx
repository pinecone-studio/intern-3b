import { Button } from '@intern-3b/shadcn';
import { Search } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

const SearchButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => redirect('/search')}
      aria-label="Хайх"
      className="cursor-pointer"
    >
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default SearchButton;
