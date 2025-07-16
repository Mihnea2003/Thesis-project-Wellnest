import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../utils/Drawer/AddWorkout/AddWorkoutStyles";

const WorkoutForm: React.FC<{ workoutDate: string; onSubmit: () => void }> = ({ workoutDate, onSubmit }) => {
  return (
    <View>
      <Text style={styles.title}>Add Workout</Text>
      <TextInput value={workoutDate} editable={false} style={styles.dateInput} />
      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutForm;