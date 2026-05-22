export const LIMIT = 10;

export interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export async function getItems(q: string, p: string): Promise<{ items: Item[]; totalCount: number }> {
  'use cache';
  const url = new URL('https://jsonplaceholder.typicode.com/posts');
  if (q) url.searchParams.set('q', q);
  url.searchParams.set('_page', p.toString());
  url.searchParams.set('_limit', LIMIT.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch items');
  
  const items = (await res.json()) as Item[];
  const totalCount = parseInt(res.headers.get('x-total-count') || '0', 10);
  
  return { items, totalCount };
}

export async function getItem(id: string): Promise<Item> {
  'use cache';
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
  return (await res.json()) as Item;
}
