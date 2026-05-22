import { getItem } from '@/lib/data';
import BackButton from '@/components/BackButton';
import { Suspense } from 'react';

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="max-w-4xl mx-auto p-6 w-full">
      <BackButton />
      <Suspense fallback={<p>Loading item details...</p>}>
        <ItemDetails params={params} />
      </Suspense>
    </main>
  );
}

async function ItemDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);

  return (
    <article className="p-6 border rounded shadow-sm bg-white">
      <h1 className="text-3xl font-bold mb-4 capitalize">{item.title}</h1>
      <p className="text-gray-500 mb-6">User ID: {item.userId} | Item ID: {item.id}</p>
      <div className="prose max-w-none text-gray-800 leading-relaxed">
        {item.body}
      </div>
    </article>
  );
}
