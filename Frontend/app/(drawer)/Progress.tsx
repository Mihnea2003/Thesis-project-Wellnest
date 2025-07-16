import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../utils/Drawer/Progress/Progress_styles';
import { API_BASE_URL } from '../../utils/Overall/IpConfig';

interface ProgressEntry {
  url: string;
  uploadedAt: string;
}

export default function Progress() {
  const [images, setImages] = useState<ProgressEntry[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Format a Date object as DD.MM.YYYY string
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email ?? null);
      if (email) {
        fetchUserImages(email);
      }
    };
    fetchUserEmail();
  }, []);

  const fetchUserImages = async (email: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/images/${email}/images`);
      const formattedImages = response.data.map((img: any) => ({
        url: img.url,
        uploadedAt: convertTimestampToDate(img.uploadedAt),
      }));
      setImages(formattedImages);
    } catch (error: any) {
      console.error('Error fetching images:', error.response?.data || error.message);
      Alert.alert('Error', 'There was an issue fetching the images.');
    }
  };

  // Convert backend timestamp object to formatted date string
  const convertTimestampToDate = (timestamp: any) => {
    if (!timestamp) return 'Invalid Date';

    const date = new Date(timestamp._seconds * 1000);
    return formatDate(date);
  };

  const pickAndUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled || result.assets.length === 0) {
      return;
    }

    const selectedImage = result.assets[0];
    
    const newEntry: ProgressEntry = {
      url: selectedImage.uri,
      uploadedAt: formatDate(new Date()),
    };

    setImages((prev) => [...prev, newEntry]);

    if (!userEmail) {
      Alert.alert('Error', 'User email not found.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      name: 'progress.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('userEmail', userEmail);

    try {
      await axios.post(`${API_BASE_URL}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUserImages(userEmail);
    } catch (error: any) {
      console.error('Upload error:', error.response?.data || error.message);
      Alert.alert('Upload Failed', 'There was an error uploading the image.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.imageGrid}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <View style={styles.imageItem} key={index}>
              <Image source={{ uri: img.url }} style={styles.progressImage} />
              <Text style={styles.dateText}>Date: {img.uploadedAt}</Text>
            </View>
          ))
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.NoimageText}>No images found.</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.uploadButton} onPress={pickAndUploadImage}>
        <Text style={styles.uploadButtonText}>+ Add Progress Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
