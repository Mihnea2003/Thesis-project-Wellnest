import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/setup/SetCalories_styles";

const activityMultipliers: Record<string, number> = {
  "Sedentary": 1.2,
  "Lightly active": 1.375,
  "Moderately active": 1.55,
  "Very active": 1.725,
  "Super active": 1.9,
};

const SetCaloriesPerDay = () => {
  const [caloriesPerDay, setCaloriesPerDay] = useState("");
  const [suggestedCalories, setSuggestedCalories] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAndCalculate = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (!email) return;

        const { data } = await axios.get(`${API_BASE_URL}/users/${email}`);
        const { weight, height, age, activityLevel } = data;

        if (!weight || !height || !age  || !activityLevel) return;

        const bmr =10 * weight + 6.25 * height - 5 * age;

        const multiplier = activityMultipliers[activityLevel];
        const maintenance = Math.round(bmr * multiplier);

        setSuggestedCalories(maintenance);
        setCaloriesPerDay(String(maintenance));
      } catch (error) {
        console.error("Failed to fetch user data or calculate calories:", error);
      }
    };

    fetchAndCalculate();
  }, []);

  const handleSetCalories = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) {
        alert("User email not found!");
        return;
      }

      await axios.patch(`${API_BASE_URL}/users/${email}`, {
        caloriesPerDay: Number(caloriesPerDay),
      });

      router.push("/Home");
    } catch (error) {
      console.error("Error updating calories:", error);
      alert("Failed to update daily calories. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How many calories do you want to eat per day?</Text>

      {suggestedCalories !== null && (
        <Text style={localStyles.suggestion}>
          Suggested: {suggestedCalories} kcal/day (maintenance)
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter daily calorie goal"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={caloriesPerDay}
        onChangeText={setCaloriesPerDay}
      />

      <TouchableOpacity style={styles.button} onPress={handleSetCalories}>
        <Text style={styles.buttonText}>Save Calories</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  suggestion: {
    color: "#CCC9DC",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SetCaloriesPerDay;
