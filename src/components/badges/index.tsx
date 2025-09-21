interface BadgeProps {
  text: string;
  type: "level" | "category";
}

export const Badge = ({ text, type }: BadgeProps) => {
  const levelClasses: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    moderate: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
    expert: "bg-purple-100 text-purple-700",
  };
  
  const categoryClasses: Record<string, string> = {
    cardio: "bg-blue-100 text-blue-700",
    resistance: "bg-orange-100 text-orange-700",
  };
  
  const baseClasses = "px-3 py-1 text-xs rounded-full";
  const classes =
    type === "level"
      ? levelClasses[text.toLowerCase()] || "bg-gray-100 text-gray-700"
      : categoryClasses[text.toLowerCase()] || "bg-gray-100 text-gray-700";
  
  return <span className={`${baseClasses} ${classes}`}>{text}</span>;
};
