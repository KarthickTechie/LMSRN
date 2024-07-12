import { Alert, StyleSheet,Image, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { images } from '@/constants'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const CustomDrawer = (props:any) => {
    const {top,bottom} = useSafeAreaInsets()

    return (
      <>
      <DrawerContentScrollView 
      {...props}>
                  <View 
                  className='
                  m-2
                  flex column justify-center items-center h-[150px] bg-white
                  border-b-[0.7px] border-neutral-200	
                  '>
                    <View className='
                    flex justify-center items-center rounded-full
                    border-5 border
                    w-[100px] h-[100px] 
                    bg-black
                    '>
                    <Fontisto style={{color:'#fccb41'}}  name="person" size={64} color="black" />
                    </View>
                    <Text className='font-pregular'>KARTHICK DURAIRAJ</Text>
                    <Text className='font-pregular text-lg text-slate-400	'>Marketing Officer , 100001</Text>
  
  
          </View>
  
          <DrawerItemList {...props} />
          <DrawerItem  label="Master Update" onPress={()=>Alert.alert('Master Update')}
           icon={({size,color})=><Ionicons name="refresh-outline" size={size} color={color}
           />}    
           labelStyle={{marginLeft:-20}}
          />
  
          <DrawerItem  
          label="logout" 
          labelStyle={{marginLeft:-20}}
          onPress={()=>Alert.alert('Logout')}
          icon={({size,color})=><Ionicons name="power-outline" size={size} color={color}/>}    
          />
          
      </DrawerContentScrollView>
  
      <View 
      style={{
          display:'flex',
          padding:20,
          paddingBottom:10+bottom,
          justifyContent:'center',
          alignItems:'center'
      }}
      >
         <Image source={images.lendperfectlogo} 
          className="w-[130px] h-[84px]"
         resizeMode='contain'/>
      </View>
      </>
    )
  }

export default CustomDrawer

const styles = StyleSheet.create({})