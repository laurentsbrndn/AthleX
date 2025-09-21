import { useEffect, useState } from "react";
import { WorkoutsComponent } from "../../components/workouts";
import { WorkoutsCategory } from "../../components/workouts_category";
import { WorkoutsLevel } from "../../components/workouts_level";
import { WorkoutsSearch } from "../../components/workouts_search";
import { getWorkoutsPackages } from "../../services/workouts";
import type { WorkoutsPackagesInterface } from "../../types/workouts";

export const WorkoutsPage = () => {
  const [workoutsPackagesList, setWorkoutsPackagesList] = useState<WorkoutsPackagesInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const workouts = await getWorkoutsPackages();
      setWorkoutsPackagesList(workouts);
    };
    fetchData();
  }, []);

  const categories = Array.from(new Set(workoutsPackagesList.map((w) => w.category)));
  const levels = Array.from(new Set(workoutsPackagesList.map((w) => w.level)));

  const filteredWorkouts = workoutsPackagesList.filter((workout) => {
    const matchesTitle = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? workout.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? workout.level === selectedLevel : true;
    return matchesTitle && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Workouts</h2>

      <div className="flex flex-col gap-4 mb-6">
        <WorkoutsSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex flex-col md:flex-row gap-4">
          <WorkoutsCategory
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <WorkoutsLevel
            levels={levels}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
          />
        </div>
      </div>

      <WorkoutsComponent workouts={filteredWorkouts} />
    </div>
  );
};
