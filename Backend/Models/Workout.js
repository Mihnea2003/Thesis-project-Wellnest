class Workout {
    constructor(email, workoutId, exercises = [], date) {
      this.email = email;
      this.workoutId = workoutId;
      this.exercises = exercises;
      this.date = date;
    }
  
    get getEmail() { return this.email; }
    get getWorkoutId() { return this.workoutId; }
    get getExercises() { return this.exercises; }
    get getDate() { return this.date; }
    
    set setEmail(email) { this.email = email; }
    set setWorkoutId(workoutId) { this.workoutId = workoutId; }
    set setExercises(exercises) { this.exercises = exercises; }
    set setDate(date) { this.date = date; }
  }
  module.exports =  Workout ;
