import React from "react";
import { TextInput, View, Text } from "react-native";
import styles from "../utils/Drawer/AddWorkout/AddWorkoutStyles";
import { Set } from "../utils/Drawer/AddWorkout/Exercisetypes";

const SetInput: React.FC<{
  set: any;
  exerciseIndex: number;
  setIndex: number;
  updateSet: (exerciseIndex: number, setIndex: number, key: keyof Set, value: string) => void;
}> = ({ set, exerciseIndex, setIndex, updateSet }) => {
  return (
    <View style={[styles.setContainer, { flexDirection: "row", alignItems: "center" }]}>
      <Text style={{ color: "#CCC9DC", marginRight: 10 }}>
        Set {setIndex + 1}:
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
        <TextInput
          placeholder="Reps"
          value={set.reps.toString()}
          onChangeText={(text) => updateSet(exerciseIndex, setIndex, "reps", text)}
          style={styles.setInput}
          keyboardType="numeric"
        />
        <Text style={{ marginLeft: 4, color: "#CCC9DC" }}>reps</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Weight (kg)"
          value={set.kg.toString()}
          onChangeText={(text) => updateSet(exerciseIndex, setIndex, "kg", text)}
          style={styles.setInput}
          keyboardType="numeric"
        />
        <Text style={{ marginLeft: 4, color: "#CCC9DC" }}>kg</Text>
      </View>
    </View>
  );
};

export default SetInput;
