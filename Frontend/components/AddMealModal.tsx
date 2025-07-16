import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from '@/utils/Drawer/AddMeal/AddMealModal_styles';
interface Ingredient {
  id: number;
  name: string;
  image: string | null;  
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: { food: string; quantity: string; calories: string }) => void;
}

const API_KEY = 'd7b65498695e4e3bae31d3a8052ae9aa';

const AddMealModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchIngredients = async (query: string) => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=10&apiKey=${API_KEY}`
      );
      setResults(res.data.results); 
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCalories = async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.spoonacular.com/food/ingredients/${id}/information?amount=100&unit=gram&apiKey=${API_KEY}`
      );
      const cal = res.data.nutrition.nutrients.find((n: any) => n.name === 'Calories');
      setCalories(cal ? cal.amount.toString() : '0');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (selected && quantity && calories) {
      const finalCals = (parseFloat(calories) * parseFloat(quantity)) / 100;
      onAdd({
        food: selected.name,
        quantity,
        calories: finalCals.toFixed(0),
      });
      resetState();
      onClose();
    }
  };

  const resetState = () => {
    setSearch('');
    setResults([]);
    setSelected(null);
    setQuantity('');
    setCalories(null);
  };

  useEffect(() => {
    if (search.length > 2) {
      fetchIngredients(search);
    } else {
      setResults([]);
    }
  }, [search]);

  useEffect(() => {
    if (selected) {
      fetchCalories(selected.id);
    }
  }, [selected]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {!selected ? (
          <>
            <TextInput
              placeholder="Search food..."
              placeholderTextColor="#aaa"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />
            <FlatList
              data={results}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelected(item)} style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <View style={styles.selectedView}>
            <Text style={styles.label}>Selected: {selected.name}</Text>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.label}>Calories per 100g: {calories}</Text>
                <TextInput
                  placeholder="Quantity (grams)"
                  keyboardType="numeric"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={quantity}
                  onChangeText={setQuantity}
                />
                <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                  <Text style={styles.addText}>Add to Meal</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        <TouchableOpacity onPress={() => { resetState(); onClose(); }} style={styles.closeButton}>
          <Text style={styles.closeText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddMealModal;
