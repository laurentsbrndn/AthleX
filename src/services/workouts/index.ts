import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { WorkoutsPackagesInterface } from "../../types/workouts";

export const getWorkoutsPackages = async (): Promise<WorkoutsPackagesInterface[]> => {
  const workoutsRef = collection(db, "workoutPackages");
  const snapshot = await getDocs(workoutsRef);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<WorkoutsPackagesInterface, "id">),
    id: doc.id,
  }));
};

export const getWorkoutById = async (id: string): Promise<WorkoutsPackagesInterface | null> => {
  const docRef = doc(db, "workoutPackages", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  return {
    ...(docSnap.data() as Omit<WorkoutsPackagesInterface, "id">),
    id,
  };
};
