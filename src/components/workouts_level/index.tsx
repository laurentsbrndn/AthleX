// components/workouts_level.tsx
interface WorkoutsLevelProps {
  levels: string[];
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const WorkoutsLevel = ({ levels, selectedLevel, onLevelChange }: WorkoutsLevelProps) => {
  return (
    <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Select Level</p>
        <div className="flex flex-wrap gap-3">
            <button
                onClick={() => onLevelChange("")}
                className={`px-4 py-2 rounded-lg transition ${
                selectedLevel === ""
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                All
            </button>
            {levels.map((level) => (
                <button
                key={level}
                onClick={() => onLevelChange(level)}
                className={`px-4 py-2 rounded-lg transition ${
                    selectedLevel === level
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                >
                {level}
                </button>
            ))}
        </div>
    </div>    
    );
};
