'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    params.set('page', '1'); // Reset to first page on search

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search items..."
        defaultValue={searchParams.get('q') || ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />
      {isPending && <p className="text-sm text-gray-500">Updating...</p>}
    </div>
  );
}
