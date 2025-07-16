import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/Drawer/MealAI/MealAI_styles";

export default function MealsAI() {
  const [mealTime, setMealTime] = useState<string>('Lunch');
  const [ingredients, setIngredients] = useState<string>('');
  const [calorieLimit, setCalorieLimit] = useState<string>('500');
  const [mealPlan, setMealPlan] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMealTimeModal, setShowMealTimeModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (ingredients.trim() === '') {
      Alert.alert('Error', 'Please enter at least one ingredient');
      return;
    }

    setLoading(true);
    setShowModal(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/mealAI/generate`, {
        mealTime: mealTime,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        calorieLimit: parseInt(calorieLimit),
      });

      setMealPlan(response.data.meal);
    } catch (error) {
      console.error('Error generating meal plan', error);
      setMealPlan('Error generating meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMealLine = (line: string, i: number) => {
    if (line.startsWith('**')) {
      return <Text style={styles.mealHeading} key={i}>{line.replace(/\*\*/g, '')}</Text>;
    } else if (line.trim() === '') {
      return <View style={styles.lineBreak} key={i} />;
    } else {
      return <Text style={styles.mealText} key={i}>{line}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plan Generator</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Meal Time</Text>
        <TouchableOpacity onPress={() => setShowMealTimeModal(true)} style={styles.input}>
          <Text style={styles.inputText}>{mealTime || 'Select Meal Time'}</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Time Modal */}
      <Modal
        isVisible={showMealTimeModal}
        onBackdropPress={() => setShowMealTimeModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => {
                setMealTime(type);
                setShowMealTimeModal(false);
              }}
              style={styles.modalOption}
            >
              <Text style={styles.modalText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Calorie Limit:</Text>
        <TextInput
          style={styles.input}
          value={calorieLimit}
          onChangeText={setCalorieLimit}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ingredients (comma separated):</Text>
        <TextInput
          style={styles.input}
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="e.g. chicken breast, spinach, olive oil"
        />
      </View>

      <TouchableOpacity
        style={styles.generateBtn}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.generateBtnText}>
          {loading ? 'Generating...' : 'Generate Meal'}
        </Text>
      </TouchableOpacity>

      {/* Meal Result Modal */}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Your Custom Meal Plan</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#CCC9DC" />
            ) : (
              <View style={styles.mealPlan}>
                {mealPlan.split('\n').map((line, i) => renderMealLine(line, i))}
              </View>
            )}
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
