interface MealPlansSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MealPlansSearch = ({ searchQuery, onSearchChange }: MealPlansSearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search meal plans..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
    />
  );
};
