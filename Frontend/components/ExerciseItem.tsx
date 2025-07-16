
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../utils/Drawer/AddWorkout/AddWorkoutStyles";
import SetInput from "./SetInput";
import { Set } from "../utils/Drawer/AddWorkout/Exercisetypes";

const ExerciseItem: React.FC<{
  exercise: any;
  index: number;
  addSet: (index: number) => void;
  updateSet: (exerciseIndex: number, setIndex: number, key: keyof Set, value: string) => void;
}> = ({ exercise, index, addSet, updateSet }) => {
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>Exercise {index + 1}</Text>
      <Text style={styles.exerciseName}>{exercise.nameOfExercise}</Text>
      <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>

      {exercise.sets.map((set: any, setIndex: number) => (
        <SetInput
          key={set.setId}
          set={set}
          exerciseIndex={index}
          setIndex={setIndex}
          updateSet={updateSet}
        />
      ))}

      <TouchableOpacity onPress={() => addSet(index)} style={styles.addSetButton}>
        <Text style={styles.buttonText}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseItem;