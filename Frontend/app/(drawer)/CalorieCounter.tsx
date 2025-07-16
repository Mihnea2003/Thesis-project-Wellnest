import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import MealItem from '../../components/MealItem';
import WeekNavigationMeals from '../../components/WeekNavigationMeals';
import { API_BASE_URL } from '../../utils/Overall/IpConfig';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

interface FoodItem {
  food: string;
  quantity: string;
  calories: number;
}

interface Meal {
  mealName: string;
  foodItems: FoodItem[];
}

interface DailyMeals {
  date: string;
  numberOfCaloriesUsed: number;
  meals: Meal[];
}

type RenderItem =
  | { type: 'header'; text: string }
  | { type: 'mealTitle'; text: string }
  | { type: 'food'; item: FoodItem };

const DailyMealsList = () => {
  const [dailyMeals, setDailyMeals] = useState<DailyMeals[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedDateMeals, setSelectedDateMeals] = useState<DailyMeals | null>(null);
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
        fetchDailyMeals();
      }
    }, [userEmail])
  );

  const fetchDailyMeals = async () => {
    if (!userEmail) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/dailymeals/${userEmail}`);
      const meals = response.data || [];
      setDailyMeals(meals);
      checkTodayMeals(meals);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setDailyMeals([]);
        setSelectedDateMeals(null);
      } else {
        console.error('Unexpected error fetching daily meals:', error);
      }
    }
  };

  const checkTodayMeals = (meals: DailyMeals[]) => {
    const today = new Date().toDateString();
    const foundMeals = meals.find(meal => new Date(meal.date).toDateString() === today);
    setSelectedDateMeals(foundMeals || null);
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
    setCurrentWeekIndex(prevIndex => prevIndex - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeekIndex(prevIndex => prevIndex + 1);
  };

  const navigateToAddMeal = () => {
    router.push('/(drawer)/AddMeal');
  };

  const buildFlatListData = (): RenderItem[] => {
    if (!selectedDateMeals) return [{ type: 'header', text: 'No meals found for this day.' }];
    const data: RenderItem[] = [
      { type: 'header', text: `Meals for ${selectedDateMeals.date}` },
      { type: 'header', text: `Calories Used: ${selectedDateMeals.numberOfCaloriesUsed}` },
    ];

    selectedDateMeals.meals.forEach(meal => {
      data.push({ type: 'mealTitle', text: meal.mealName });
      meal.foodItems.forEach(food => data.push({ type: 'food', item: food }));
    });

    return data;
  };

  const renderItem: ListRenderItem<RenderItem> = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.text}>{item.text}</Text>;
    } else if (item.type === 'mealTitle') {
      return <Title style={styles.text}>{item.text}</Title>;
    } else if (item.type === 'food') {
      return <MealItem foodItem={item.item} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <WeekNavigationMeals
        currentWeekIndex={currentWeekIndex}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        getWeekDates={getWeekDates}
        dailyMeals={dailyMeals}
        setSelectedDateMeals={setSelectedDateMeals}
      />

      <FlatList
        data={buildFlatListData()}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={navigateToAddMeal}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1821',
  },
  listContent: {
    padding: 10,
    paddingBottom: 100,
  },
  text: {
    color: '#CCC9DC',
    fontSize: 16,
    marginBottom: 5,
  },
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

export default DailyMealsList;
