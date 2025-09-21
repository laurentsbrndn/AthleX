interface MealPlansFilterProps {
  categories: string[];
  selectedCategory: string[];
  onCategoryChange: (category: string) => void;
}


export const MealPlansFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: MealPlansFilterProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">

      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-lg transition ${
          selectedCategory.length === 0
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {categories.map((category) => {
        const isSelected = selectedCategory.includes(category);
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg transition ${
              isSelected
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};