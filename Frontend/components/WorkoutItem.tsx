import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';


const formatMuscleGroup = (str: string) => {
  return str
    .split('_') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');
};

interface Set {
  setId: string;
  reps: number;
  kg: number;
}

interface Exercise {
  sets: Set[];
  exerciseId: string;
  nameOfExercise: string;
  muscleGroup: string;
}

interface WorkoutItemProps {
  exercise: Exercise;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ exercise }) => {

  const formattedMuscleGroup = formatMuscleGroup(exercise.muscleGroup);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <Title style={styles.text}>{exercise.nameOfExercise}</Title>
        <Paragraph style={styles.text}>Muscle Group: {formattedMuscleGroup}</Paragraph>
        <View style={styles.setsContainer}>
          {exercise.sets.map((set, setIndex) => (
            <Paragraph key={set.setId} style={styles.text}>
              Set {setIndex + 1}: {set.reps} reps, {set.kg} kg
            </Paragraph>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: { margin: 10, backgroundColor: '#324A5F' },
  setsContainer: { marginTop: 5, padding: 5 },
  text: { color: '#CCC9DC' },
});

export default WorkoutItem;
