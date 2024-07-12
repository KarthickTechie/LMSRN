import { View, Text } from 'react-native'
import React from 'react'
import SearchBox from './SearchBox'

const BannerTopComponent = () => {
  return (
    <View className='flex bg-navy-100 h-[25vh] px-5 py-5'>
      
      <Text className='
      text-xl
      font-pregular 
      tracking-widest 
      letter-spacing'>DISCOVER</Text>
      
      <Text className='
      text-xl
      font-pregular 
      tracking-widest 
      letter-spacing'>LEADS</Text>
      
      <View className='w-[30vw] h-[5px] rounded-lg	bg-navy my-3'></View>

      <Text className='font-pregular text-black-200'>Discover all leads below</Text>

      <SearchBox 
      otherStyle="absolute bottom-[-20] left-[8%]"
      />

    </View>
    
  )
}

export default BannerTopComponent