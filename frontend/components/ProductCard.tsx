"use client";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { Product } from "@/model/product";
import toast from "react-hot-toast";

export default function ProductCard(product: Product) {
  const handleAddToCart = () => {
    toast.success("Ați adăugat produsul în coș!", {
      id: `cart-${product.id}`, // Prevents duplicate toasts for same product
    });
  };

  return (
    <div className="overflow-hidden shadow-lg rounded-lg hover:bg-gray-100 transition-colors">
      <Link
        href={`/catalog/${product.id}`}
        className="block px-3 py-2 rounded-md"
      >
        <div className="flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            className="object-cover w-[120%] md:w-[140%] h-auto"
          />
          <div className="mt-6 space-y-2">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">
              {product.description.get("Overview") || "Acest produs nu are descriere."}
            </p>
            <p className="text-blue-600 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
      
      <hr className="border-gray-200" />
      
      <div className="flex justify-center items-center p-4">
        <div className="flex gap-1">
          <Link href={`/catalog/${product.id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors text-sm md:text-base">
              Cumpără acum
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition-colors text-2xl md:text-3xl"
            aria-label="Add to cart"
          >
            <IoCartOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
