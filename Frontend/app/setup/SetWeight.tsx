import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList as RNFlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/setup/SetWeight_styles";


const SetWeightImage = require("../../assets/images/SetWeight_photo.png");

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 20;

const SetWeight = () => {
  const [weight, setWeight] = useState(70);
  const flatListRef = useRef<RNFlatList<number>>(null);
  const router = useRouter();

  const weights = Array.from({ length: 101 }, (_, i) => 40 + i); 

  useEffect(() => {
    const index = weights.indexOf(weight);

    
    if (index >= 0 && index < weights.length) {
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({ index, animated: false });
        } catch (error) {
          console.warn("Error scrolling to index:", error);
        }
      }, 100);
    } else {
      console.warn("Invalid index for weight:", index);
    }
  }, [weight]); 

  const handleSetWeight = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) {
        alert("User email not found!");
        return;
      }
      const right_weight=weight-2;
      await axios.patch(`${API_BASE_URL}/users/${email}`, { weight:right_weight });
      router.push("/setup/SetHeight");
    } catch (error) {
      console.error("Error updating weight:", error);
      alert("Failed to update weight.");
    }
  };

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setWeight(weights[index]);
  };

  return (
    <View style={[styles.container, { paddingVertical: 40, justifyContent: "space-between" }]}>
      {/* Header */}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.header}>What is your weight?</Text>
      </View>

      {/* Ruler */}
      <View style={styles.rulerContainer}>
        <Text style={styles.weightText}>{weight-2}</Text>
        <Text style={styles.unitText}>kg</Text>

        <FlatList
          ref={flatListRef}
          data={weights}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
          }}
          onMomentumScrollEnd={onScrollEnd}
          keyExtractor={(item) => item.toString()}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={Customstyles.tickContainer}>
              {item % 10 === 0 ? (
                <Text style={styles.label}>{item}</Text>
              ) : null}
              <View
                style={[
                  styles.tick,
                  {
                    height: item % 10 === 0 ? 30 : item % 5 === 0 ? 20 : 10,
                    backgroundColor: "#CCC9DC",
                  },
                ]}
              />
            </View>
          )}
        />

        <View style={styles.centerLine} />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleSetWeight}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};


const Customstyles = StyleSheet.create({
  tickContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
  },
});

export default SetWeight;
