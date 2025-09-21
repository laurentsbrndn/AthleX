import { Link } from "react-router-dom";
import type { MealPlansInterface } from "../../types/meal_plans";

interface MealPlansComponentProps {
  meals: MealPlansInterface[];
}

export const MealPlansComponent = ({ meals }: MealPlansComponentProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {meals.map((mealPlans) => (
        <Link
          key={mealPlans.id}
          to={`/meal-plans/${mealPlans.id}`}
          className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-200"
        >
          {mealPlans.imageURL && (
            <img
              src={mealPlans.imageURL}
              alt={mealPlans.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          )}
          <h1 className="text-lg font-semibold text-gray-800 mb-2">{mealPlans.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {mealPlans.category.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};
