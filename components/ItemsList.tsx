import { getItems, LIMIT, type Item } from '@/lib/data';
import Pagination from './Pagination';

export async function ItemsListContainer({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams;
  const { items, totalCount } = await getItems(q, page);
  const totalPages = Math.ceil(totalCount / LIMIT) || 1;
  return (
  <>
    <ItemsList items={items} />
    <Pagination totalPages={totalPages} />
  </>
  );
}

export function ItemsList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <div className="p-4 bg-gray-100 rounded">No items found.</div>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-lg capitalize">{item.title}</h2>
          <p className="text-gray-600 line-clamp-2">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
