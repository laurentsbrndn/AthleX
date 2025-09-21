import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { MealPlansInterface } from "../../types/meal_plans";

export const getMealPlans = async (): Promise<MealPlansInterface[]> => {
  const mealPlansRef = collection(db, "mealPlans");
  const snapshot = await getDocs(mealPlansRef);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<MealPlansInterface, "id">),
    id: doc.id,
  }));
};

export const getMealPlanById = async (id: string): Promise<MealPlansInterface | null> => {
  const docRef = doc(db, "mealPlans", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    ...(snapshot.data() as Omit<MealPlansInterface, "id">),
    id: snapshot.id,
  };
};
