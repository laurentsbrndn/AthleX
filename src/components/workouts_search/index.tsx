interface WorkoutsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WorkoutsSearch = ({ searchQuery, onSearchChange }: WorkoutsSearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search workouts..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
    />
  );
};
