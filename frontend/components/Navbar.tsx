"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const iconSize = 24;

const routingLinks = [
  { label: "Catalog", href: "/catalog" },
  { label: "Despre noi", href: "/about" },
];

const shoppingLinks = [
  { label: <IoCartOutline fontSize={iconSize} />, href: "/cart" },
  { label: <IoPersonOutline fontSize={iconSize} />, href: "/account" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-700 px-4 shadow-sm fixed top-0 w-full z-[100]">
      <div className="flex h-24 items-center justify-between">
        {/* Desktop links */}
        <nav className="hidden md:flex items-center space-x-4">
          {routingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Menu"
        >
          {isOpen ? <HiX size={iconSize} /> : <HiMenu size={iconSize} />}
        </button>

        {/* Logo / site title */}
        <div className="font-bold text-lg -ml-10">
          <Link href="/" className="hover:text-teal-500 transition-colors">
            <div className="flex items-center space-x-4">
              <Image
                src="/pictures/logo.png"
                alt="Site logo"
                width={100}
                height={13}
                priority
              />
              <b>Proiect</b>
            </div>
          </Link>
        </div>

        {/* Shopping icons */}
        <nav className="flex items-center space-x-4">
          {shoppingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="pb-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            {routingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
