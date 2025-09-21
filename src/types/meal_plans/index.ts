export interface MealPlansInterface {
  id: string;
  title: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  category: string[];
  imageURL: string;
  description: string;
  sugar: number;
  fiber: number;
  recipe: {
    ingredients: string[];
    instructions: string[];
  };
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}