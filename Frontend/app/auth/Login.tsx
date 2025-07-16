import React, { useState, useEffect } from "react";
import { View, Text,TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/auth/Login_styles";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");
        const storedRememberMe = await AsyncStorage.getItem("rememberMe");

        if (storedEmail && storedPassword && storedRememberMe === "true") {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setRememberMe(true);
          
          handleLogin(storedEmail, storedPassword, true);
        }
      } catch (error) {
        console.log("Auto-login failed:", error);
      }
    };

    autoLogin();
  }, []);

  const handleLogin = async (inputEmail = email, inputPassword = password, isAutoLogin = false) => {
    try {
      if (!inputEmail || !inputPassword) {
        Alert.alert("Error", "Both email and password are required.");
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: inputEmail,
        password: inputPassword,
      });

      if (response.status === 200) {
        const userResponse = await axios.get(`${API_BASE_URL}/users/${inputEmail}`);
        const user = userResponse.data;

        if (rememberMe) {
          await AsyncStorage.setItem("userEmail", inputEmail);
          await AsyncStorage.setItem("userPassword", inputPassword);
          await AsyncStorage.setItem("rememberMe", "true");
        } else {
          await AsyncStorage.removeItem("userPassword");
          await AsyncStorage.setItem("rememberMe", "false");
        }

        if (!user.age || user.age === 0) {
          router.push("/setup/SetAge");
        } else {
          router.push("/(drawer)/Home");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      
      <TextInput
        label="Email"
        outlineColor="#CCC9DC"
        style={styles.input}
        textColor="#CCC9DC"
        value={email}
        activeOutlineColor="#324A5F"
        mode='outlined'
        onChangeText={setEmail}
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
    

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.rememberMeContainer} 
        onPress={() => setRememberMe(!rememberMe)}
        activeOpacity={0.6}
      >
        <Checkbox
          status={rememberMe ? "checked" : "unchecked"}
          color="#CCC9DC"
        />
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push("/auth/Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};


export default Login;
