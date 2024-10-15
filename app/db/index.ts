import { Index } from '@upstash/vector';

require('dotenv').config({ path: '.env.local' });

export type Product = {
  id: string;
  imageId: string;
  name: string;
  color: 'white' | 'beige' | 'purple' | 'blue' | 'green';
  size: 'S' | 'M' | 'L';
  price: number;
};

export const db = new Index<Product>();
