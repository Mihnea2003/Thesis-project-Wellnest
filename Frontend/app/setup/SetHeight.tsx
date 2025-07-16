import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList as RNFlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../utils/Overall/IpConfig";
import styles from "../../utils/setup/SetHeight_styles"; 

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 20;

const SetHeight = () => {
  const [height, setHeight] = useState(170);
  const flatListRef = useRef<RNFlatList<number>>(null);
  const router = useRouter();

  const heights = Array.from({ length: 101 }, (_, i) => 120 + i);  

  useEffect(() => {
    const index = heights.indexOf(height);

    if (index >= 0 && index < heights.length) {
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({ index, animated: false });
        } catch (error) {
          console.warn("Error scrolling to index:", error);
        }
      }, 100);
    }
  }, [height]);

  const handleSetHeight = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) {
        alert("User email not found!");
        return;
      }
       const right_height=height-2;
      await axios.patch(`${API_BASE_URL}/users/${email}`, { height:right_height });
      router.push("/setup/SetGoal");
    } catch (error) {
      console.error("Error updating height:", error);
      alert("Failed to update height.");
    }
  };

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setHeight(heights[index]);
  };

  return (
    <View style={[styles.container, { paddingVertical: 40, justifyContent: "space-between" }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.header}>What is your height?</Text>
      </View>

      <View style={styles.rulerContainer}>
      <View style={styles.heightRow}>
  <Text style={styles.weightText}>{height-2}</Text>
  <Text style={styles.inlineUnit}>cm</Text>
</View>

        <FlatList
          ref={flatListRef}
          data={heights}
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

      <TouchableOpacity style={styles.button} onPress={handleSetHeight}>
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

export default SetHeight;
