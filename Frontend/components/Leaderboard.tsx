import React from 'react';
import { View, Text } from 'react-native';

interface LeaderboardProps {
  leaderboardData: any[];
}

const Leaderboard = ({ leaderboardData }: LeaderboardProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      {leaderboardData.length > 0 ? (
        leaderboardData.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ fontSize: 18 ,color:"#CCC9DC"}}>{item.name}</Text>
            <Text style={{ fontSize: 18 ,color:"#CCC9DC"}}>{item.points} Points</Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 18,color:"#CCC9DC" }}>No leaderboard data available</Text>
      )}
    </View>
  );
};

export default Leaderboard;
