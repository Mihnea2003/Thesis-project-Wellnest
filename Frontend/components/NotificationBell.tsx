import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type NotificationBellProps = {
  onPress: () => void;
  unreadCount?: number;
};

const NotificationBell: React.FC<NotificationBellProps> = ({ onPress, unreadCount = 0 }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.bellContainer}>
      <AntDesign name="bells" size={28} color="#324A5F" />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default NotificationBell;
