import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../utils/Drawer/AddWorkout/AddWorkoutStyles";

const ExerciseDetails: React.FC<{
  exercise: any;
  onAdd: () => void;
  onClose: () => void;
}> = ({ exercise, onAdd, onClose }) => {
  return (
    <View style={styles.exerciseDetails}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.exerciseDetail}>Muscle: {exercise.muscle}</Text>
      <Text style={styles.exerciseDetail}>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.exerciseDetail}>Instructions: {exercise.instructions}</Text>

      <TouchableOpacity onPress={onAdd} style={styles.addButton}>
        <Text style={styles.buttonText}>Add to Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseDetails;