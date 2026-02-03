"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProductDescription({
  description,
  showOverview = false,
}: {
  description: Map<string, string>;
  showOverview?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredEntries = Array.from(description.entries()).filter(
    ([title]) => !(title.toLowerCase() === "overview" && !showOverview)
  );

  return (
    <div className="py-4">
      {filteredEntries.map(([title, content], index) => (
        <div key={title} className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="flex-1 font-semibold text-lg">{title}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
