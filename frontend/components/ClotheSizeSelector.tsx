"use client";
import { useState } from "react";

interface RadioCardProps {
  value: string;
  isSelected: boolean;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

function RadioCard({ value, isSelected, onChange, children }: RadioCardProps) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="clothing-size"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`border rounded-md shadow-md px-5 py-3 transition-colors ${
          isSelected
            ? "bg-teal-300 text-white border-teal-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        {children}
      </div>
    </label>
  );
}

export default function ClotheSizeSelector() {
  const options = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState("M");

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    console.log(value); // TODO: handle size change logic here
  };

  return (
    <div className="flex gap-2">
      {options.map((value) => (
        <RadioCard
          key={value}
          value={value}
          isSelected={selectedSize === value}
          onChange={handleSizeChange}
        >
          {value}
        </RadioCard>
      ))}
    </div>
  );
}
