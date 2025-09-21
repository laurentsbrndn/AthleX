import { useEffect, useState } from "react";
import { getMealPlans } from "../../services/meal_plans";
import { MealPlansComponent } from "../../components/meal_plans";
import type { MealPlansInterface } from "../../types/meal_plans";
import { MealPlansFilter } from "../../components/meal_plans_category";
import { MealPlansSearch } from "../../components/meal_plans_search";

export const MealPlansPage = () => {
  const [mealPlansList, setMealPlansList] = useState<MealPlansInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const plans = await getMealPlans();
      setMealPlansList(plans);
    };
    fetchData();
  }, []);

  const categories = Array.from(
    new Set(mealPlansList.flatMap((meal) => meal.category))
  );

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const filteredMealPlans = mealPlansList.filter((meal) => {
    const matchesTitle = meal.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0
        ? true
        : meal.category.some((cat) => selectedCategories.includes(cat));

    return matchesTitle && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meal Plans</h2>

      <MealPlansSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <MealPlansFilter
        categories={categories}
        selectedCategory={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      <MealPlansComponent meals={filteredMealPlans} />
    </div>
  );
};
