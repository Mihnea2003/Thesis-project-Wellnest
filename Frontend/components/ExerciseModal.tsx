import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import styles from "../utils/Drawer/AddWorkout/AddWorkoutStyles";
import { API_CONFIG } from "../utils/Drawer/AddWorkout/NinjaApiExercises";
import ExerciseDetails from "./ExerciseDetails";
import {
  muscleGroups,
  difficulties,
} from "../utils/Drawer/WorkoutAI/Exercise_list";

const API_KEY = API_CONFIG.API_KEY;
const API_URL = API_CONFIG.API_URL;


const getLabel = (
  list: { key: string; label: string }[],
  key: string
): string => list.find((item) => item.key === key)?.label || key;

const ExerciseModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onExerciseSelect: (exercise: any) => void;
}> = ({ visible, onClose, onExerciseSelect }) => {
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExercises();
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedMuscle, selectedDifficulty, searchQuery]);

  const fetchExercises = async () => {
    if (loading) return;

    setLoading(true);
    try {
      let query = "?";

      if (searchQuery.trim()) {
        query += `name=${searchQuery.trim()}&`;
      }

      if (selectedMuscle) {
        query += `muscle=${selectedMuscle}&`;
      }

      if (selectedDifficulty) {
        query += `difficulty=${selectedDifficulty}&`;
      }

      query = query.replace(/&$/, "");

      const response = await fetch(`${API_URL}${query}`, {
        method: "GET",
        headers: { "X-Api-Key": API_KEY },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setExerciseList(data);
    } catch (error) {
      console.error("Fetch exercises error:", error);
      Alert.alert("Error", "Could not fetch exercises. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedMuscle("");
    setSelectedDifficulty("");
    setSearchQuery("");
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select Exercise</Text>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search exercises..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.filterRow}>
          {/* Muscle Group Selector */}
          <View style={styles.selectorContainer}>
            <Text style={styles.pickerLabel}>Muscle Group:</Text>
            <ModalSelector
              data={muscleGroups}
              initValue={
                selectedMuscle
                  ? getLabel(muscleGroups, selectedMuscle)
                  : "Select muscle group"
              }
              onChange={(option) => setSelectedMuscle(option.key)}
              cancelText="Cancel"
              animationType="slide"
              selectStyle={styles.selector}
              selectTextStyle={styles.selectorText}
              optionTextStyle={styles.optionText}
              cancelStyle={styles.cancelButton}
              cancelTextStyle={styles.cancelText}
              overlayStyle={styles.overlay}
              sectionTextStyle={styles.sectionText}
              optionContainerStyle={styles.optionContainer}
            />
          </View>

          {/* Difficulty Selector */}
          <View style={styles.selectorContainer}>
            <Text style={styles.pickerLabel}>Difficulty:</Text>
            <ModalSelector
              data={difficulties}
              initValue={
                selectedDifficulty
                  ? getLabel(difficulties, selectedDifficulty)
                  : "Select difficulty"
              }
              onChange={(option) => setSelectedDifficulty(option.key)}
              cancelText="Cancel"
              animationType="slide"
              selectStyle={styles.selector}
              selectTextStyle={styles.selectorText}
              cancelStyle={styles.cancelButton}
              cancelTextStyle={styles.cancelText}
              optionTextStyle={styles.optionText}
              optionContainerStyle={styles.optionContainer}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={clearFilters}
          style={styles.clearFiltersButton}
          disabled={
            !selectedMuscle && !selectedDifficulty && !searchQuery.trim()
          }
        >
          <Text style={styles.buttonText}>Clear Filters</Text>
        </TouchableOpacity>

        {/* Scrollable content */}
        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#1B2A41" />
          ) : selectedExercise ? (
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <ExerciseDetails
                exercise={selectedExercise}
                onAdd={() => {
                  onExerciseSelect(selectedExercise);
                  setSelectedExercise(null);
                }}
                onClose={() => setSelectedExercise(null)}
              />
            </ScrollView>
          ) : (
            <FlatList
              data={exerciseList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedExercise(item)}
                  style={styles.exerciseItem}
                >
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.exerciseDetail}>
                    Muscle: {getLabel(muscleGroups, item.muscle)}
                  </Text>
                  <Text style={styles.exerciseDetail}>
                    Difficulty: {getLabel(difficulties, item.difficulty)}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <Text
                  style={{
                    color: "#CCC9DC",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  No exercises found. Try different filters.
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

        {/* Fixed Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ExerciseModal;
