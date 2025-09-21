import type { ChangeEvent } from "react";

interface ProductsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductsSearch = ({ searchTerm, onSearchChange }: ProductsSearchProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
};
