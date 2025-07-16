import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FoodItem {
  food: string;
  quantity: string;
  calories: number;
}

const MealItem = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.foodText}>{foodItem.food}</Text>
      <Text style={styles.quantityText}>{foodItem.quantity} grams</Text>
      <Text style={styles.caloriesText}>{foodItem.calories} calories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: { padding: 10, backgroundColor: '#2E3B44', marginBottom: 5, borderRadius: 5 },
  foodText: { color: '#FFF', fontSize: 16 },
  quantityText: { color: '#CCC', fontSize: 14 },
  caloriesText: { color: '#FFD700', fontSize: 14 },
});

export default MealItem;
