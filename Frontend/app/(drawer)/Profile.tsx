import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import { Ionicons } from '@expo/vector-icons';
import Leaderboard from '../../components/Leaderboard';
import styles from '../../utils/Drawer/Profile/Profile_styles'; 

interface UserData {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: string;
  points: number;
  caloriesPerDay: number;
  Workouts: string[];
  DailyMeals: string[];
}

const Profile = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const translateY = useRef(new Animated.Value(0)).current;

  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (!email) {
          console.log("No email found in AsyncStorage");
          return;
        }

        const response = await fetch(`${API_BASE_URL}/users/${email}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.log("Failed to fetch user data:", data);
        }
      } catch (error) {
        console.error("Error while fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const leaderboardResponse = await fetch(`${API_BASE_URL}/users/leaderboard`);
        const leaderboardData = await leaderboardResponse.json();
        if (leaderboardResponse.ok) {
          setLeaderboardData(leaderboardData);
        } else {
          console.log("Failed to fetch leaderboard data:", leaderboardData);
        }
      } catch (error) {
        console.error("Error while fetching leaderboard:", error);
      }
    };

    fetchUserData();
    fetchLeaderboard();
  }, []);

  const handleUpdateField = async () => {
    if (!userData || !fieldToUpdate || !newValue) return;

    try {
      const updatedUserData = { ...userData, [fieldToUpdate]: newValue };

      const response = await fetch(`${API_BASE_URL}/users/${userData.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        setUserData(updatedUserData);
        setModalVisible(false);
        setFieldToUpdate('');
        setNewValue('');
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error while updating user data:", error);
    }
  };

  const renderFieldWithUpdateIcon = (label: string, field: string, value: string | number) => {
    if (field === 'points') {
      return (
        <View style={styles.fieldContainer}>
          <Text style={[styles.boldText, styles.fieldText]}>{`${label}: `}</Text> 
          <Text style={styles.fieldText}>{value !== undefined && value !== null ? value : 'N/A'}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.boldText}>{`${label}: `}</Text> 
        <Text style={styles.fieldText}>{value}</Text>
        <TouchableOpacity onPress={() => { setFieldToUpdate(field); setNewValue(value.toString()); setModalVisible(true); }} >
          <Ionicons name="create" size={24} color="#CCC9DC" style={styles.updateIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#CCC9DC" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Animated.View style={styles.profileContainer}>
      <Text style={styles.leaderboardTitle}>Profile Details</Text>
        {renderFieldWithUpdateIcon('Name', 'name', userData.name)}
        {renderFieldWithUpdateIcon('Email', 'email', userData.email)}
        {renderFieldWithUpdateIcon('Age', 'age', userData.age)}
        {renderFieldWithUpdateIcon('Height', 'height', userData.height)}
        {renderFieldWithUpdateIcon('Weight', 'weight', userData.weight)}
        {renderFieldWithUpdateIcon('Activity Level', 'activityLevel', userData.activityLevel)}
        {renderFieldWithUpdateIcon('Calories Per Day', 'caloriesPerDay', userData.caloriesPerDay)}
        {renderFieldWithUpdateIcon('Points', 'points', userData.points)}
        
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update {fieldToUpdate}</Text>
              <TextInput
                style={styles.inputField}
                value={newValue}
                onChangeText={setNewValue}
                placeholder={`Enter new ${fieldToUpdate}`}
              />
              <TouchableOpacity onPress={handleUpdateField} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animated.View>

      
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        <Leaderboard leaderboardData={leaderboardData} />
      </View>
    </View>
  );
};

export default Profile;
