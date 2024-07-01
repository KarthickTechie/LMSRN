import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,textStyles,isLoading}) => {
  return (
    <TouchableOpacity   
     className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
      ${containerStyles} ${isLoading?'opacity-50':''}`}
      activeOpacity={0.7}
      disabled={isLoading}
     onPress={handlePress}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})