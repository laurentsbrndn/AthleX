import { Link } from "react-router-dom";
import type { WorkoutsPackagesInterface } from "../../types/workouts";
import { Badge } from "../badges"; // 👈 import Badge

interface WorkoutsComponentProps {
  workouts: WorkoutsPackagesInterface[];
}

export const WorkoutsComponent = ({ workouts }: WorkoutsComponentProps) => {
  if (workouts.length === 0) {
    return <p className="text-gray-600">No workouts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <Link
          key={workout.id}
          to={`/workouts/${workout.id}`}
          className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-200"
        >
          {workout.imageURL && (
            <img
              src={workout.imageURL}
              alt={workout.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          )}

          <h1 className="text-lg font-semibold text-gray-800 mb-2">{workout.title}</h1>

          <div className="flex flex-wrap gap-2 mb-2">
            <Badge text={workout.category} type="category" />
            <Badge text={workout.level} type="level" />
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{workout.description}</p>
        </Link>
      ))}
    </div>
  );
};
