import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import WorkoutItem from '../../components/WorkoutItem';
import WeekNavigation from '../../components/WeekNavigation';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import { Workout } from "../../utils/Drawer/AddWorkout/Exercisetypes";
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; 

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const router = useRouter();

 
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email ?? null);
    };
    fetchUserEmail();
  }, []);

 
  useFocusEffect(
    useCallback(() => {
      if (userEmail) {
        fetchWorkouts();
      }
    }, [userEmail])
  );

  
  const fetchWorkouts = async () => {
    if (!userEmail) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/workouts/${userEmail}`);
      const workoutsData = response.data || [];
      setWorkouts(workoutsData);
      checkTodayWorkout(workoutsData);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setWorkouts([]);
        setTodayWorkout(null);
      } else {
        console.error('Unexpected error fetching workouts:', error);
      }
    }
  };

  
  const checkTodayWorkout = (workouts: Workout[]) => {
    const today = new Date().toDateString();
    const foundWorkout = workouts.find(workout => new Date(workout.date).toDateString() === today);
    setTodayWorkout(foundWorkout || null);
  };

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const handlePreviousWeek = () => {
    setCurrentWeekIndex(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeekIndex(prev => prev + 1);
  };

  const navigateToAddWorkout = () => {
    router.push('/(drawer)/AddWorkout');
  };

  const renderWorkoutContent = () => {
    const workoutToShow = selectedDate
      ? workouts.find(w => new Date(w.date).toDateString() === selectedDate.toDateString())
      : todayWorkout;

    const label = selectedDate
      ? `Workout on ${selectedDate.toDateString()}`
      : "Today's Workout";

    const isFuture = selectedDate && selectedDate > new Date();

    if (!workoutToShow) {
      return (
        <Text style={styles.noWorkoutText}>
          {isFuture
            ? 'This date is in the future.'
            : 'You didn’t go to the gym on this day.'}
        </Text>
      );
    }

    return (
      <View>
        <Title style={styles.text}>{label}</Title>
        <FlatList
          data={workoutToShow.exercises}
          renderItem={({ item, index }) => <WorkoutItem key={index} exercise={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        getWeekDates={getWeekDates}
        workouts={workouts}
        setSelectedWorkoutDate={setSelectedDate}
      />

      {renderWorkoutContent()}

      {/* Floating "+" Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={navigateToAddWorkout}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#0C1821' },
  text: { color: '#CCC9DC', fontSize: 16, marginBottom: 5 },
  noWorkoutText: { color: '#CCC9DC', textAlign: 'center', marginTop: 20, fontSize: 18 },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#324A5F',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#CCC9DC',
    fontWeight: 'bold',
  },
});

export default WorkoutList;
