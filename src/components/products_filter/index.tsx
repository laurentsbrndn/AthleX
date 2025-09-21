interface ProductsFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProductsFilter = ({ categories, selectedCategory, onCategoryChange }: ProductsFilterProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-lg transition ${
          selectedCategory === "all"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg transition ${
            selectedCategory === category
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
