import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/auth/Register_styles"
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

 
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

   
    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and contain at least one number and one letter."
      );
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        name,
      });
      
      router.push("/auth/Login");
    } catch (error:any) {
      setErrorMessage(error.response ? error.response.data.error : "Registration failed");
      Alert.alert("Registration Failed", error.response ? error.response.data.error : "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
              label="Name"
              outlineColor ="#CCC9DC"
              style={styles.input}
              textColor="#CCC9DC"
              value={name}
              activeOutlineColor="#324A5F"
              mode = 'outlined'
              onChangeText={(text) => setName(text)}
            />
      <TextInput
              label="Email"
              outlineColor ="#CCC9DC"
              style={styles.input}
              textColor="#CCC9DC"
              value={email}
              activeOutlineColor="#324A5F"
              mode = 'outlined'
              onChangeText={(text) => setEmail(text)}
            />
      <TextInput
        label="Password"
        outlineColor="#CCC9DC"
        style={styles.input}
        textColor="#CCC9DC"
        secureTextEntry={!isPasswordVisible}  
        activeOutlineColor="#324A5F"
        value={password}
        mode='outlined'
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}  
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}  
          />
        }
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push("/auth/Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};


export default Register;
