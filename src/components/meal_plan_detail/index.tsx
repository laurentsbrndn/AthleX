import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MealPlansInterface } from "../../types/meal_plans";
import { getMealPlanById } from "../../services/meal_plans";
import { Badge } from "../badges";

export const MealPlansDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mealPlan, setMealPlan] = useState<MealPlansInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getMealPlanById(id);
      setMealPlan(data);
    };
    fetchData();
  }, [id]);

  if (!mealPlan) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Hero Image */}
      {mealPlan.imageURL && (
        <img
          src={mealPlan.imageURL}
          alt={mealPlan.title}
          className="w-full h-[350px] object-cover rounded-xl shadow-md mb-6"
        />
      )}

      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          {mealPlan.title}
        </h1>

        {/* Category Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {mealPlan.category.map((cat, i) => (
            <Badge key={i} text={cat} type="category" />
          ))}
        </div>

        {/* Description */}
        {mealPlan.description && (
          <p className="text-gray-700 leading-relaxed mb-8 text-center">
            {mealPlan.description}
          </p>
        )}

        {/* Time Info */}
        <div className="flex justify-center gap-6 mb-10 text-gray-700">
          {mealPlan.prepTime && (
            <p>
              <span className="font-semibold">Prep Time:</span> {mealPlan.prepTime}
            </p>
          )}
          {mealPlan.cookTime && (
            <p>
              <span className="font-semibold">Cook Time:</span> {mealPlan.cookTime}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {/* Baris 1 */}
          <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">{mealPlan.calories}</p>
            <p className="text-sm text-gray-600">Calories</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">{mealPlan.protein}g</p>
            <p className="text-sm text-gray-600">Protein</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">{mealPlan.carbohydrate}g</p>
            <p className="text-sm text-gray-600">Carbs</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">{mealPlan.fat}g</p>
            <p className="text-sm text-gray-600">Fat</p>
          </div>
                
          {/* Baris 2 pakai flex biar center */}
          <div className="col-span-2 sm:col-span-4 flex justify-center gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-800">{mealPlan.sugar}g</p>
              <p className="text-sm text-gray-600">Sugar</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-800">{mealPlan.fiber}g</p>
              <p className="text-sm text-gray-600">Fiber</p>
            </div>
          </div>
        </div>


        {/* Recipe Section */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
            {mealPlan.recipe.ingredients.length === 0 ? (
              <p className="text-gray-600">No ingredients available.</p>
            ) : (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {mealPlan.recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
            
          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
            {mealPlan.recipe.instructions.length === 0 ? (
              <p className="text-gray-600">No instructions available.</p>
            ) : (
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                {mealPlan.recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
