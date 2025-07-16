import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface WeekNavigationProps {
  currentWeekIndex: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  getWeekDates: (weekOffset: number) => Date[];
  workouts: any[];
  setSelectedWorkoutDate: (date: Date) => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  currentWeekIndex,
  onPreviousWeek,
  onNextWeek,
  getWeekDates,
  workouts,
  setSelectedWorkoutDate,
}) => {
  return (
    <View style={styles.weekNavigation}>
      <TouchableOpacity onPress={onPreviousWeek} style={styles.navigationButton}>
        <AntDesign name="leftcircleo" size={30} color="#324A5F" />
      </TouchableOpacity>

      <View style={styles.weekContainer}>
        {getWeekDates(currentWeekIndex).map((date, i) => {
          const formattedDate = date.toDateString();
          const workout = workouts.find(
            workout => new Date(workout.date).toDateString() === formattedDate
          );

          return (
            <TouchableOpacity
              key={i}
              style={styles.bubble}
              onPress={() => setSelectedWorkoutDate(date)}
            >
              <Text style={styles.bubbleText}>{date.getDate()}</Text>
              {workout ? (
                <AntDesign name="checkcircle" size={18} color="green" />
              ) : date > new Date() ? (
                <AntDesign name="clockcircle" size={18} color="gray" />
              ) : (
                <AntDesign name="closecircle" size={18} color="red" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={onNextWeek} style={styles.navigationButton}>
        <AntDesign name="rightcircleo" size={30} color="#324A5F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    position: 'relative',
  },
  navigationButton: {
    padding: 5,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '85%',
  },
  bubble: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
    backgroundColor: '#324A5F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
  },
  bubbleText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default WeekNavigation;
