import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export type InboxCardProps={
    title:string;
    leftMarginColor:string;
    subtitle:string;
    count:number;
    icon:string;
}
const InboxCard = ({title,count,leftMarginColor,subtitle,icon}:InboxCardProps) => {
  return (
    <View className='
    flex flex-row justfy-center items-center
    w-[90vw] h-[50px] 
    p-2

    '>
      <View className='w-[5] h-[50px] bg-green rounded-sm'></View>
      <View className='flex flex-row w-[30px] h-[30px] bg-green rounded-md
      justify-center items-center mx-5'>
        <Ionicons name={icon}  size={20} />
      </View>
    </View>
  )
}

export default InboxCard