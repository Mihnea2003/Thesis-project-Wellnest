import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../utils/Overall/IpConfig";

function CustomDrawerContent(props: any) {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        
        if (email) {
          const response = await fetch(`${API_BASE_URL}/users/${email}`);
          const data = await response.json();

          if (data && data.name) {
            setUserName(data.name);
            setUserEmail(data.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#1B2A41' }}>
      <Image
  source={{ uri: `https://ui-avatars.com/api/?name=${userName}&background=CCC9DC&color=000&size=128` }}
  style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
/>
        <Text style={{ color: '#CCC9DC', fontSize: 18, fontWeight: 'bold' }}>
          {userName} 
        </Text>
        <Text style={{ color: '#CCC9DC', fontSize: 14 }}>
          {userEmail} 
        </Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#1B2A41' },
        headerTintColor: '#CCC9DC',
        drawerStyle: { backgroundColor: '#1B2A41' },
        drawerActiveTintColor: '#CCC9DC',
        drawerInactiveTintColor: '#324A5F',
        drawerActiveBackgroundColor: '#0C1821',
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Exercises"
        options={{
          title: 'Workouts',
          drawerIcon: ({ color, size }) => <Ionicons name="fitness" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="CalorieCounter"
        options={{
          title: 'Calorie Counter',
          drawerIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="OCRScreen"
        options={{
          title: 'Read Ingredients',
          drawerIcon: ({ color, size }) => <Ionicons name="camera" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MealAI"
        options={{
          title: 'Meal AI',
          drawerIcon: ({ color, size }) => <Ionicons name="sparkles" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="WorkoutAI"
        options={{
          title: 'Workout AI',
          drawerIcon: ({ color, size }) => <Ionicons name="sparkles" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Progress"
        options={{
          title: 'Progress',
          drawerIcon: ({ color, size }) => <Ionicons name="save" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          title: 'My Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AddMeal"
          options={{
          title: 'Add Meal',
          drawerItemStyle: { display: 'none' }, 
          headerShown: true, 
          headerTintColor: '#CCC9DC', 
          headerStyle: { backgroundColor: '#1B2A41' }, 
      }}
    />
    <Drawer.Screen
      name="AddWorkout"
      options={{
        title: 'Add Workout',
        drawerItemStyle: { display: 'none' },
        headerShown: true,
        headerTintColor: '#CCC9DC',
        headerStyle: { backgroundColor: '#1B2A41' },
      }}
    />
    </Drawer>
  );
}
