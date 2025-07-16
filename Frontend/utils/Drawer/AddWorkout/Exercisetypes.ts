
export type Set = {
    setId: string;
    reps: number;
    kg: number;
  };
  
  
  export type Exercise = {
    exerciseId: string;
    nameOfExercise: string;
    muscleGroup: string;
    sets: Set[];
  };
  
  export type Workout ={
    workoutId: string;
    date: string;
    exercises: Exercise[];
  }