export interface Product {
  id: number;
  name: string;
  description: Map<string, string>;
  price: number;
  images: string[] | null;
}
