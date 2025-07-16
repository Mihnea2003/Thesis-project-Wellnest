import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import Value from '../../components/ValueSteps';
import RingProgress from '../../components/RingProgress';
import useHealthData from '../../hooks/useHealthData';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationBell from '../../components/NotificationBell';
import styles from "../../utils/Drawer/Home/Home_styles";
import notificationMessages from '../../constants/NotificationMessages';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Home = () => {
  const [date, setDate] = useState(new Date());
  const { steps, distance } = useHealthData(date);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesEaten, setCaloriesEaten] = useState(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date); 
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate); 
  };

  const sendNotification = async () => {
    const message = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: message,
      },
      trigger: null, 
    });
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissions Required', 'Enable notifications to receive reminders.');
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    const fetchCaloriesEatenAndPerDay = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
          const userResponse = await axios.get(`${API_BASE_URL}/users/${userEmail}`);
          const userData = userResponse.data;
          setCaloriesPerDay(userData.caloriesPerDay || 0);
        } catch (error: any) {
          if (error.response?.status === 404) {
            setCaloriesPerDay(0);
          } else {
            throw error;
          }
        }

        try {
          const response = await axios.get(`${API_BASE_URL}/dailymeals/${userEmail}`);
          const dailyMeals = response.data || [];

          const todayMeals = dailyMeals.find(
            (meal: { date: string | number | Date; }) =>
              new Date(meal.date).toDateString() === date.toDateString()
          );

          setCaloriesEaten(todayMeals?.numberOfCaloriesUsed || 0);
        } catch (error: any) {
          if (error.response?.status === 404) {
            setCaloriesEaten(0);
          } else {
            throw error;
          }
        }

      } catch (error) {
        console.error('Unexpected error fetching meals or user data:', error);
        setCaloriesEaten(0);
        setCaloriesPerDay(0);
      }
    };

    fetchCaloriesEatenAndPerDay();
  }, [date]);

  useEffect(() => {
    const burned = steps * 0.04;
    setCaloriesBurned(burned);
  }, [steps]);

  const caloriesLeft = caloriesPerDay - caloriesEaten + caloriesBurned;
  const progress = caloriesEaten / caloriesPerDay;

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#CCC9DC"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#CCC9DC"
        />
      </View>

      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={progress}
        caloriesEaten={caloriesEaten}
        caloriesLeft={caloriesLeft}
      />

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Calories Burned" value={caloriesBurned.toFixed(0)} />
      </View>

      <StatusBar style="auto" />

      {/* Notification Bell triggers local notification */}
      <TouchableOpacity style={styles.bellContainer} onPress={sendNotification}>
        <NotificationBell onPress={sendNotification} unreadCount={notifications.length} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
