import { useState } from "react";

interface QuantitySelectorProps {
  stock: number;
  onChange: (value: number) => void;
}

export const QuantitySelector = ({ stock, onChange }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (val: number) => {
    if (val < 1) val = 1;
    if (val > stock) val = stock;

    setQuantity(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg 
                     text-gray-600 text-lg font-bold hover:bg-gray-100 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => updateQuantity(Number(e.target.value))}
          className="w-14 text-center border border-gray-300 rounded-lg py-1 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= stock}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg 
                     text-gray-600 text-lg font-bold hover:bg-gray-100 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
};
