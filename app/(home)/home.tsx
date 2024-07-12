import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SubHeader from '@/components/subheader'
import BannerTopComponent from '@/components/BannerTop'
import Dashboard from '@/components/Dashboard'
import { Ionicons } from '@expo/vector-icons'
const Home = () => {
const navigation = useNavigation()

  const openDrawer = ()=>{
      navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return (
    <View className='flex column'>
          <SubHeader />
          <BannerTopComponent />
    <View className='flex flex-column justify-center items-center mt-10'>
       <View className='flex flex-row w-[100%]  justify-center items-center align-center '>
        <View className='w-[80%] pl-[25%]'>
        <Text className='font-psemibold text-xl'>LEAD DETAILS</Text>
        </View>
        <View className='
        flex justify-center items-center
        shadow
        bg-orange rounded-full w-[40px] h-[40px] '>
        <TouchableOpacity className=''>
        <Ionicons name="add" size={24} color="black" />          
        </TouchableOpacity>

        </View>
       </View>
       
       <View className='w-[85vw] h-[2px] bg-white m-2'></View>

       <Dashboard otherStyle=''/>
    </View>
    </View>
  )
}

export default Home