import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type SearchBoxProps = {
    otherStyle:string
  };
const SearchBox = ({otherStyle}:SearchBoxProps) => {
  return (
   
     <View className={`
     flex flex-row
     flex-nowrap 
     justify-evenly
     w-[85vw] 
     bg-white
     rounded-md
     shadow
     ${otherStyle}
     `}>
        <View className='
        p-2
        bg-white
        w-[70%]
        '>
            <TextInput 
            className=''
            placeholder='Search Lead By Lead ID / Name'
            />
        </View>
        <View className='
        flex justify-center items-center
        w-[15%]
        bg-orange
        relative left-5
        rounded-r-md
        '>
        <TouchableOpacity>
        <Ionicons name="search-outline" size={24} color="black" />

        </TouchableOpacity>
        </View>

     </View>
  )
}

export default SearchBox