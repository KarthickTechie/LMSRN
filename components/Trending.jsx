import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <Text className="text-white">{item.id}</Text>;
      }}
      horizontal
    />
  );
};

export default Trending;
