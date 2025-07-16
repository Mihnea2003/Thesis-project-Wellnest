import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import styles from "../../utils/setup/SetAge_styles"; 
import { API_BASE_URL } from "@/utils/Overall/IpConfig";

const SetAge = () => {
  const router = useRouter();
  const [age, setAge] = useState(18);

  const handleDecrease = () => {
    if (age > 1) setAge(age - 1);
  };

  const handleIncrease = () => {
    setAge(age + 1);
  };

  const handleSetAge = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");

      if (!email) {
        alert("User email not found!");
        return;
      }

      await axios.patch(`${API_BASE_URL}/users/${email}`, { age });
      router.push("/setup/SetWeight");
    } catch (error) {
      console.error("Error updating age:", error);
      alert("Failed to update age. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tell me your age</Text>

      <View style={styles.amountContainer}>
        <TouchableOpacity onPress={handleDecrease} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.ageText}>{age}</Text>

        <TouchableOpacity onPress={handleIncrease} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSetAge}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetAge;
