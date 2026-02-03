"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // TODO: Load cart from cookies/localStorage
  useEffect(() => {
    // Example: Load from localStorage or js-cookie
    // const savedCart = localStorage.getItem('cart');
    // if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 10 : 0; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto py-28 px-4">
      <h1 className="text-2xl font-bold mb-8">Coșul de cumpărături</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Coșul este gol.</p>
          <Link
            href="/catalog"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            Continuă cumpărăturile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link
                    href={`/catalog/${item.id}`}
                    className="font-semibold text-lg hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.size && (
                    <p className="text-sm text-gray-500">Mărime: {item.size}</p>
                  )}
                  <p className="text-blue-600 font-semibold mt-2">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors self-start"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-28">
              <h2 className="text-xl font-bold mb-4">Sumar comandă</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livrare</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition-colors">
                  Finalizează comanda
                </button>
              </Link>

              <Link href="/catalog">
                <button className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded transition-colors">
                  Continuă cumpărăturile
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
