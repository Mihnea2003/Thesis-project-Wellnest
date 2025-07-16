import React, { useState, useEffect } from "react";
import { Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import styles from "../../utils/Drawer/AddWorkout/AddWorkoutStyles";
import { Set, Exercise } from "../../utils/Drawer/AddWorkout/Exercisetypes";
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import ExerciseModal from "../../components/ExerciseModal";
import ExerciseItem from "../../components/ExerciseItem";
import { addPoints } from "../../utils/Gamification/AddPoints";

const AddWorkoutScreen: React.FC = () => {
  const [workoutDate, setWorkoutDate] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [showExerciseModal, setShowExerciseModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setWorkoutDate(new Date().toISOString().split("T")[0]);
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const addExerciseToWorkout = (exercise: any) => {
    setExercises([
      ...exercises,
      {
        exerciseId: Date.now().toString(),
        nameOfExercise: exercise.name,
        muscleGroup: exercise.muscle,
        sets: [],
      },
    ]);
    setShowExerciseModal(false);
    addPoints(userEmail, 20); 
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const lastSet = updatedExercises[exerciseIndex].sets.slice(-1)[0];

    if (lastSet && (lastSet.reps === 0 || lastSet.kg === 0)) {
      Alert.alert("Please fill in the last set before adding a new one.");
      return;
    }

    updatedExercises[exerciseIndex].sets.push({
      setId: Date.now().toString(),
      reps: 0,
      kg: 0,
    });
    setExercises(updatedExercises);
    addPoints(userEmail, 5); 
  };

  const updateSet = (exerciseIndex: number, setIndex: number, key: keyof Set, value: string) => {
    const updatedExercises = [...exercises];
    if (key === "reps" || key === "kg") {
      updatedExercises[exerciseIndex].sets[setIndex][key] = parseInt(value) || 0;
    }
    setExercises(updatedExercises);
  };

  const submitWorkout = async () => {
    if (exercises.length === 0) {
      Alert.alert("Please add at least one exercise.");
      return;
    }

    const workoutData = {
      email: userEmail,
      workoutId: Date.now().toString(),
      exercises,
      date: workoutDate,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        await addPoints(userEmail, 50); 
        Alert.alert("Workout saved successfully!");
        setExercises([]);
        router.push("/Exercises");
      } else {
        Alert.alert("Failed to save workout", data.message || "Unknown error");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
  <Text style={styles.title}>Add Workout</Text>
  <Text style={[styles.dateInput, { marginBottom: 0 }]}>{workoutDate}</Text>
</View>

      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.exerciseId}
          exercise={exercise}
          index={index}
          addSet={addSet}
          updateSet={updateSet}
        />
      ))}

      <TouchableOpacity
        onPress={() => setShowExerciseModal(true)}
        style={styles.addExerciseButton}
      >
        <Text style={styles.buttonText}>+ Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={submitWorkout}
        style={styles.submitButton}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator color="#fff" /> : "Save Workout"}
        </Text>
      </TouchableOpacity>

      <ExerciseModal
        visible={showExerciseModal}
        onClose={() => setShowExerciseModal(false)}
        onExerciseSelect={addExerciseToWorkout}
      />
    </ScrollView>
  );
};

export default AddWorkoutScreen;
