import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/Overall/IpConfig';
import AddMealModal from '../../components/AddMealModal';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';
import { addPoints } from '../../utils/Gamification/AddPoints'; 
import styles from '../../utils/Drawer/AddMeal/AddMeal_styles';

interface FoodItem {
  food: string;
  quantity: string;
  calories: string;
}

const AddMealScreen = () => {
  const [mealType, setMealType] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMealTypeModalVisible, setIsMealTypeModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email ?? null);
    };
    fetchEmail();
  }, []);

  const handleAddFoodItem = (item: FoodItem) => {
    setFoodItems((prev) => [...prev, item]);

   
    if (userEmail) {
      addPoints(userEmail, 50);  
    }
  };

  const handleSubmit = async () => {
    if (!mealType || foodItems.length === 0 || !userEmail) {
      Alert.alert('Missing Fields', 'Please select a meal type and add at least one food item.');
      return;
    }

    const totalCalories = foodItems.reduce((sum, item) => sum + parseFloat(item.calories), 0);
    const today = new Date().toISOString().split('T')[0];

    const mealData = {
      email: userEmail,
      numberOfCaloriesUsed: totalCalories,
      meals: [
        {
          mealName: mealType,
          foodItems,
        },
      ],
      date: today,
    };

    try {
      await axios.post(`${API_BASE_URL}/dailymeals/`, mealData);
      Alert.alert('Success', 'Meal added successfully!');
      setMealType('');
      setFoodItems([]);
      router.push('/(drawer)/CalorieCounter');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add meal.');
    }
  };

  const handleMealTypeSelect = (type: string) => {
    setMealType(type);
    setIsMealTypeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Type</Text>
      <TouchableOpacity onPress={() => setIsMealTypeModalVisible(true)} style={styles.input}>
        <Text style={styles.inputText}>{mealType || 'Select Meal Type'}</Text>
      </TouchableOpacity>

      {/* Meal Type Modal */}
      <Modal
        isVisible={isMealTypeModalVisible}
        onBackdropPress={() => setIsMealTypeModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((type) => (
            <TouchableOpacity key={type} onPress={() => handleMealTypeSelect(type)} style={styles.modalOption}>
              <Text style={styles.modalText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Text style={styles.label}>Food Items</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItemContainer}>
            <Text style={styles.foodItemName}>{item.food}</Text>
            <Text style={styles.foodItemDetails}>
              {item.quantity}g • {item.calories} kcal
            </Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Food Item</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Meal</Text>
      </TouchableOpacity>

      <AddMealModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onAdd={handleAddFoodItem} />
    </View>
  );
};

export default AddMealScreen;
