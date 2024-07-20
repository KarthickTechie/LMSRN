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
const FormField = ({
  title,
  otherStyle,
  placeholder,
  value,
  handleChangeText,
  keyBoardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-1  ${otherStyle}`}>
      <Text className="text-base text-black-200 font-pmedium">{title}</Text>
      <View
        className="w-full h-16 px-4 bg-black-100 border-2 border-black-100 rounded-2xl 
      focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 text-base text-white font-psemibold"
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#fff"
          onChangeText={handleChangeText}
          secureTextEntry={title == "Password" && !showPassword}
          {...props}
        />
        {title == "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMethod="contains"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
