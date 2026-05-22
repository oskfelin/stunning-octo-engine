import { Suspense } from 'react';
import Search from '@/components/Search';
import { ItemsListContainer } from '@/components/ItemsList';

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  return (
    <main className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Items List</h1>
      
      <Suspense fallback={<SearchPlaceholder />}>
        <Search />
      </Suspense>

      <Suspense fallback={<p>Loading items...</p>}>
        <ItemsListContainer searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

function SearchPlaceholder() {
  return <div className="h-10 bg-gray-200 animate-pulse mb-4 rounded" />;
}
