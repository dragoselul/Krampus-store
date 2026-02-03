import ProductCard from "@/components/ProductCard";
import { Product } from "@/model/product";

export default function Catalog() {
  const products: Product[] = [
    {
      id: 1,
      name: "Produs 1",
      description: new Map([
        ["Overview", "Descriere produs 1"],
      ]),
      price: 19.99,
      images: null,
    },
    {
      id: 2,
      name: "Produs 2",
      description: new Map([
        ["Overview", "Descriere produs 2"],
      ]),
      price: 29.99,
      images: null,
    },
    {
      id: 3,
      name: "Produs 3",
      description: new Map([
        ["Overview", "Descriere produs 3"],
      ]),
      price: 39.99,
      images: null,
    },
    {
      id: 4,
      name: "Produs 4",
      description: new Map([
        ["Overview", "Descriere produs 4"],
      ]),
      price: 49.99,
      images: null,
    },
    {
      id: 5,
      name: "Produs 5",
      description: new Map([
        ["Overview", "Descriere produs 5"],
      ]),
      price: 59.99,
      images: null,
    },
    {
      id: 6,
      name: "Produs 6",
      description: new Map([
        ["Overview", "Descriere produs 6"],
      ]),
      price: 69.99,
      images: null,
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto py-28 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((p: Product) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
