import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { WorkoutsPackagesInterface } from "../../types/workouts";
import { getWorkoutById } from "../../services/workouts";
import { Badge } from "../badges";

export const WorkoutPackagesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [workoutPackages, setWorkoutsPackages] = useState<WorkoutsPackagesInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getWorkoutById(id);
      setWorkoutsPackages(data);
    };
    fetchData();
  }, [id]);

  if (!workoutPackages) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {workoutPackages.imageURL && (
        <img
          src={workoutPackages.imageURL}
          alt={workoutPackages.title}
          className="w-full h-[350px] object-cover rounded-xl shadow-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        {workoutPackages.title}
      </h1>

      <div className="flex justify-center gap-3 mb-6">
        <Badge text={workoutPackages.category} type="category" />
        <Badge text={workoutPackages.level} type="level" />
      </div>

      <p className="text-gray-700 leading-relaxed mb-10 text-center">
        {workoutPackages.description}
      </p>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Exercises</h2>

        {workoutPackages.workouts.length === 0 ? (
          <p className="text-gray-600 text-center">No exercises available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {workoutPackages.workouts.map((exercise, index) => (
              <a
                key={index}
                href={exercise.videoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-xl border shadow-sm bg-white hover:bg-green-50 hover:shadow-md transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-medium text-gray-800">
                    {exercise.exercise}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Repetitions:</span> {exercise.repetitions}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sets:</span> {exercise.sets}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
