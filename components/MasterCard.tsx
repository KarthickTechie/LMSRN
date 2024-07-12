import { View, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { transform } from '@babel/core';


export type MasterCardViewProps = {
    title: string;
    opacity:number;
    classProps?:string;
    status:boolean;
    index:number;
  };
   
const MasterCard = ({title,opacity,classProps,status,index}:MasterCardViewProps) => {
    const opacAnimation = useRef(new Animated.Value(0)).current
    const trxAnimation = useRef(new Animated.Value(0)).current
    const iconOpaAnim = useRef(new Animated.Value(1)).current
    const colorAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacAnimation, {
                toValue: 1,
                useNativeDriver: true,
                duration: 2000,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(trxAnimation, {
                    toValue: 8,
                    useNativeDriver: true,
                    duration: 500,
                    easing:Easing.linear
                }),
                Animated.timing(iconOpaAnim,{
                  toValue: 0,
                  useNativeDriver: true,
                  duration: 100,
                  easing:Easing.bounce
                }),
  
                Animated.timing(trxAnimation, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 300,
                }),
            ])
        ).start();

        // color animation


    }, []);


    const anim = index == 0 && !status ? {  opacity:iconOpaAnim, transform: [{ translateY: trxAnimation }] } : {};
    console.log(anim)
  return (
    <Animated.View 
    style={{opacity:opacAnimation}}
    className={`flex-row w-[80vw]
    h-[64px]
    justify-around items-center 
        ${classProps}
`}>
        <View className='flex w-[24px]  bg-transparent clip'>
            <Animated.View className=''  style={[anim]}>
        <AntDesign name={status ? "checkcircle" : "download"} size={24} 
        color={status ? "green" : "white"}
        />
        </Animated.View>
          {/* <MaterialIcons name={status ? "check-box" : "download"} size={24} color="white" className='mx-2' /> */}
        </View>
        <View className='flex-1 items-start mx-5   '>
          <Text className='text-2xl text-white tracking-wide font-pregular'>{title}</Text>
        </View>
      
      </Animated.View>
    
  )
}

export default MasterCard