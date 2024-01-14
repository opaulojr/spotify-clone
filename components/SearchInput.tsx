'use client';

import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import Input from './Input';

function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debounceValue = useDebounce<string>(value, 1000);

  useEffect(() => {
    if (debounceValue.trim() !== '') {
      const query = {
        title: debounceValue,
      };

      const url = qs.stringifyUrl({
        url: '/search',
        query,
      });

      router.push(url);
    }
  }, [debounceValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="focus:outline-white max-w-[400px]"
    />
  );
}

export default SearchInput;
