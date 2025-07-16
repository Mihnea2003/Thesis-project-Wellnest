import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert, Image } from 'react-native';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/Drawer/WorkoutAI/WorkoutAI_styles";
import muscleImages from '../../utils/Drawer/WorkoutAI/MuscleImages';
import { muscleGroupsAI } from '../../utils/Drawer/WorkoutAI/Exercise_list';

export default function WorkoutAI() {
  const [days, setDays] = useState<string>('');
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [workout, setWorkout] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>(''); 

  const toggleMuscleGroup = (key: string) => {
    setSelectedMuscles(prev =>
      prev.includes(key)
        ? prev.filter(m => m !== key)
        : [...prev, key]
    );
  };

  const handleSubmit = async () => {
    if (parseInt(days) > 7) {
      Alert.alert('Error', 'The number of workout days cannot exceed 7.', [
        { text: 'OK', style: 'cancel' }
      ], { cancelable: true });
      return;
    }

    if (selectedMuscles.length === 0) {
      Alert.alert('Error', 'Please select at least one muscle group');
      return;
    }

    setLoading(true);
    setShowModal(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/workoutAI/generate`, {
        days: parseInt(days),
        muscleGroups: selectedMuscles,
        notes: notes.trim() 
      });

      setWorkout(response.data.workout);
    } catch (error) {
      console.error('Error generating workout plan', error);
      setWorkout('Error generating workout plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderWorkoutLine = (line: string, i: number) => {
    if (line.startsWith('**')) {
      return <Text style={styles.workoutHeading} key={i}>{line.replace(/\*\*/g, '')}</Text>;
    } else if (line.trim() === '') {
      return <View style={styles.lineBreak} key={i} />;
    } else {
      return <Text style={styles.workoutText} key={i}>{line}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Plan Generator</Text>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
          placeholder="Enter number of workout days"
          placeholderTextColor="#CCC9DC"
          maxLength={1}
          selectionColor="#CCC9DC"
        />
      </View>

      <View style={styles.formGroup}>
        <View style={styles.muscleGroupGrid}>
          {muscleGroupsAI.map((group) => (
            <TouchableOpacity
              key={group.key}
              style={[styles.muscleBtn, selectedMuscles.includes(group.key) && styles.selectedMuscleBtn]}
              onPress={() => toggleMuscleGroup(group.key)}
            >
              <View style={styles.muscleGroupItem}>
                {muscleImages[group.key] && (
                  <Image source={muscleImages[group.key]} style={styles.muscleImage} />
                )}
                <Text style={selectedMuscles.includes(group.key) ? styles.selectedMuscleText : styles.muscleText}>
                  {group.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes (e.g., no dumbbells)"
          placeholderTextColor="#CCC9DC"
          selectionColor="#CCC9DC"
        />
      </View>

      <TouchableOpacity
        style={[styles.generateBtn, { paddingVertical: 12, paddingHorizontal: 24 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.generateBtnText}>
          {loading ? 'Generating...' : 'Generate Workout'}
        </Text>
      </TouchableOpacity>

      {/* Updated Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}  
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Custom Workout Plan</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#CCC9DC" />
            ) : (
              <ScrollView style={styles.scrollViewContent}>
                <View style={styles.workoutPlan}>
                  {workout.split('\n').map((line, i) => renderWorkoutLine(line, i))}
                </View>
                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={closeModal}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
