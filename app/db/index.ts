import { Index } from '@upstash/vector';

export type Product = {
  id: string;
  imageId: string;
  name: string;
  color: 'white' | 'beige' | 'purple' | 'blue' | 'green';
  size: 'S' | 'M' | 'L';
  price: number;
};

export const db = new Index<Product>();
