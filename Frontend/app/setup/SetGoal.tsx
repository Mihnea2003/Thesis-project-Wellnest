import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/setup/SetGoal_styles";

const SetGoal = () => {
  const [activityLevel, setActivityLevel] = useState("");
  const router = useRouter();

  const handleSetActivity = async (selectedLevel: string) => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");

      if (!storedEmail) {
        alert("User email not found!");
        return;
      }

      await axios.patch(`${API_BASE_URL}/users/${storedEmail}`, {
        activityLevel: selectedLevel,
      });

      router.push("/setup/SetCalories");
    } catch (error) {
      console.error("Error updating activity level:", error);
      alert("Failed to update activity level. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What is your activity level?</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleSetActivity("Sedentary")}>
        <Text style={styles.buttonText}>Sedentary (little or no exercise)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSetActivity("Lightly active")}>
        <Text style={styles.buttonText}>Lightly active (1–3 days/week)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSetActivity("Moderately active")}>
        <Text style={styles.buttonText}>Moderately active (3–5 days/week)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSetActivity("Very active")}>
        <Text style={styles.buttonText}>Very active (6–7 days/week)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSetActivity("Extra active")}>
        <Text style={styles.buttonText}>Extra active (physical job or 2× training)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal;
