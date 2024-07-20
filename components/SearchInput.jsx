import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
icons;
const SearchInput = ({
  title,
  otherStyle,
  placeholder,
  value,
  handleChangeText,
  keyBoardType,
  ...props
}) => {
  return (
    <View
      className="w-full h-16 px-4 bg-black-100 border-2 border-black-100 rounded-2xl 
      focus:border-secondary items-center flex-row"
    >
      <TextInput
        className="flex-1 text-base text-white font-psemibold"
        placeholder={placeholder}
        value={value}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        {...props}
      />
      <TouchableOpacity onPress={() => {}}>
        <Image
          className="w-6 h-6"
          source={icons.search}
          resizeMethod="contains"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
