import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, ActivityIndicator,
  TouchableOpacity, Modal, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';
import { Buffer } from 'buffer';
import rawData from '../../assets/data/ingredients.json';
import styles from '../../utils/Drawer/OCRScreen/OCRScreen_styles';

interface IngredientData {
  name: string;
  label: 'good' | 'bad' | 'neutral';
  reason: string;
}

const ingredientDB = rawData as IngredientData[];

const AZURE_API_KEY = '19Cisgsbv12Frl5QuHqoxP5XyNbduadxjYRYBRQJHG1KNIHxSr3OJQQJ99BFAC5RqLJXJ3w3AAAFACOGynwx';
const AZURE_API_URL = 'https://licenta-mihnea.cognitiveservices.azure.com/vision/v3.2/ocr';

interface AnalyzedIngredient {
  name: string;
  label: 'good' | 'bad' | 'neutral' | 'unknown';
  reason: string;
}

const OCRScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<AnalyzedIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<AnalyzedIngredient | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setOcrText(null);
      setIngredients([]);
    }
  };

  const parseIngredients = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    const match = lowerText.match(/ingredients?\s*[:\-]\s*([\s\S]+?)\./i);
    if (match && match[1]) {
      const cleanText = match[1].replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      return cleanText
        .split(',')
        .map(item => item.trim().replace(/[^a-zA-Z0-9\s\-]/g, ''))
        .filter(item => item.length > 0);
    }
    return [];
  };

  const analyzeIngredients = (names: string[]): AnalyzedIngredient[] => {
    return names.map(name => {
      const match = ingredientDB.find(i => i.name.toLowerCase() === name.toLowerCase());
      return {
        name,
        label: match?.label || 'unknown',
        reason: match?.reason || 'No information available.',
      };
    });
  };

  const compressImage = async (uri: string): Promise<string> => {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipulated.uri;
  };

  const extractTextFromImage = async () => {
    if (!imageUri) return;
    setLoading(true);
    setOcrText(null);
    setIngredients([]);

    try {
      const processedUri = await compressImage(imageUri);

      const base64 = await FileSystem.readAsStringAsync(processedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = Buffer.from(base64, 'base64');

      const response = await axios.post(
        AZURE_API_URL,
        buffer,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
            'Content-Type': 'application/octet-stream',
          },
          params: {
            language: 'en',
            detectOrientation: 'true',
          },
        }
      );

      const regions = response.data.regions || [];
      let extractedText = '';

      regions.forEach((region: { lines: any[] }) => {
        region.lines.forEach(line => {
          const lineText = line.words.map((word: any) => word.text).join(' ');
          extractedText += lineText + '\n';
        });
      });

      if (!extractedText.trim()) {
        Alert.alert('No Text Found', 'The image does not contain any recognizable text.');
        setLoading(false);
        return;
      }

      setOcrText(extractedText);

      const parsed = parseIngredients(extractedText);
      const analyzed = analyzeIngredients(parsed);
      setIngredients(analyzed);
    } catch (error: any) {
      console.error('Azure OCR error:', error);
      Alert.alert('OCR Error', 'Failed to extract text. Try using a clearer or simpler image.');
      setOcrText('Error retrieving text');
    } finally {
      setLoading(false);
    }
  };

  const getPillStyle = (label: string) => {
    switch (label) {
      case 'good':
        return { backgroundColor: '#2ecc71' };
      case 'bad':
        return { backgroundColor: '#e74c3c' };
      case 'neutral':
        return { backgroundColor: '#95a5a6' };
      default:
        return { backgroundColor: '#7f8c8d' };
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {imageUri && (
        <TouchableOpacity style={styles.button} onPress={extractTextFromImage}>
          <Text style={styles.buttonText}>Extract Text</Text>
        </TouchableOpacity>
      )}

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      {ingredients.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Detected Ingredients:</Text>
          <View style={styles.pillWrapper}>
            {ingredients.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedIngredient(item)}>
                <View style={[styles.ingredientPill, getPillStyle(item.label)]}>
                  <Text style={styles.pillText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Modal
        visible={!!selectedIngredient}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedIngredient(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedIngredient?.name}</Text>
            <Text style={styles.modalText}>{selectedIngredient?.reason}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedIngredient(null)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default OCRScreen;
