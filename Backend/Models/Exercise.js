class Exercise {
  constructor(exerciseId, nameOfExercise, muscleGroup, sets = [], difficulty, equipment, instructions , videoUrl) {
      this.exerciseId = exerciseId;
      this.nameOfExercise = nameOfExercise;
      this.muscleGroup = muscleGroup;
      this.sets = sets;
      this.difficulty = difficulty; 
      this.equipment = equipment; 
      this.instructions = instructions; 
      this.videoUrl = videoUrl; 
  }

  get getExerciseId() { return this.exerciseId; }
  get getNameOfExercise() { return this.nameOfExercise; }
  get getMuscleGroup() { return this.muscleGroup; }
  get getSets() { return this.sets; }
  get getDifficulty() { return this.difficulty; } 
  get getEquipment() { return this.equipment; } 
  get getInstructions() { return this.instructions; } 
  get getVideoUrl() { return this.videoUrl; }
  
  set setExerciseId(exerciseId) { this.exerciseId = exerciseId; }
  set setNameOfExercise(nameOfExercise) { this.nameOfExercise = nameOfExercise; }
  set setMuscleGroup(muscleGroup) { this.muscleGroup = muscleGroup; }
  set setSets(sets) { this.sets = sets; }
  set setDifficulty(difficulty) { this.difficulty = difficulty; } 
  set setEquipment(equipment) { this.equipment = equipment; } 
  set setInstructions(instructions) { this.instructions = instructions; } 
  set setVideoUrl(videoUrl) { this.videoUrl = videoUrl; } 
}

module.exports = Exercise;
