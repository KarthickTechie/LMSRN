import { View, Text, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]
      "
        resizeMethod="contain"
      />
      <Text
        className="text-white 
      text-lg font-psemibold

      "
      >
        {title}
      </Text>
      <Text
        className="
      text-white
      text-sm font-pregular"
      >
        {subtitle}
      </Text>
      <CustomButton
        title="Create New Lead"
        containerStyles="w-[85vw] mt-5"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
