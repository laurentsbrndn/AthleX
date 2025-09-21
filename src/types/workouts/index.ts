export interface Exercise {
  exercise: string;
  repetitions: number;
  sets: number;
  videoURL: string;
}

export interface WorkoutsPackagesInterface {
  id: string;
  category: string;
  description: string;
  level: string;
  title: string;
  imageURL: string;
  workouts: Exercise[];
}