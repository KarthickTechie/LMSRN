import { View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const VideoCard = ({video:{title,thumbnail,video,users:{avatar,username}}}) => {
    const[play,setPlay] = useState(false)
  return (
    <View className="flex-col px-4 mb-14">
      <View className="flex-row justify-start gap-3 ">
        <View className="flex-row flex-1 justify-center items-center">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary 
            justify-center items-center p-0.5">
                <Image source={{uri:avatar}} className="w-full h-full rounded-lg" 
                resizeMode='cover'/>

            </View>
            <View className="flex-1 justify-center ml-3 gap-y-1">
                <Text className="text-white text-sm font-psemibold" numberOfLines={1}>{title}</Text>
                <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
            </View>
            <View className="p-2 ">
                <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
            </View>
        </View>
      </View>
      {play ? <Text>Playin</Text> : 
      <TouchableOpacity className="w-full h-60 mt-3 rounded-xl">
        <Image source={{uri:thumbnail}} resizeMode='cover' 
        className="w-full h-full rounded-xl mt-3"/>  
      </TouchableOpacity>}
    </View>
  )
}

export default VideoCard