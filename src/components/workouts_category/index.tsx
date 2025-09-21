interface WorkoutsCategoryProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const WorkoutsCategory = ({ categories, selectedCategory, onCategoryChange }: WorkoutsCategoryProps) => {
  return (
    <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Select Category</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategoryChange("")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === ""
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
    </div>
  );
};
