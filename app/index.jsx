import { Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Redirect,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

// zoho oauth endpoint 

const discovery = {
    authorizationEndpoint: 'https://accounts.zoho.com/oauth/v2/auth',
    tokenEndpoint: 'https://accounts.zoho.in/oauth/v2/token',
  };
  
const App = () => {
    const {isLoading,isLoggedIn} = useGlobalContext()
    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: '1000.Q4PIUMENPBBERXN1CC0G8RZSIF9RBS',
          scopes: ['ZohoCRM.users.ALL'],
          redirectUri: makeRedirectUri({
            scheme: 'com.sysarc.lms'
          }),
        },
        discovery
      );
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { code } = response.params;
        }
      }, [response]);

    // if(!isLoading && isLoggedIn) return (<Redirect href="/home"/>)

    const handleRoute = ()=>{

        router.push('master')
    }

    return (

        <SafeAreaView className="bg-navy h-full">
            <ScrollView
                contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full justify-center items-center px-4">
                    <Image source={images.lendperfectlogo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain' />
                    {/* <Image source={images.cards}
                        className="max-w-[380px]  w-full  h-[300px]"
                        resizeMode='contain' /> */}
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless{"\n"}
                            Possibilities with {" "}
                            <Text className="text-secondary-200">UCO LMS</Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-sm text-gray-100 text-pregular text-center mt-10">
                        Where creativity meets innovation: embark on a journey of limitless exploration 
                        with Lorum
                    </Text>

                    <CustomButton 
                    title="Login Now"
                    // handlePress={ ()=>promptAsync()}
                    handlePress={handleRoute}
                    containerStyles="w-full mt-7"
                    />
                </View>
                <StatusBar backgroundColor='#D4E7FF' style='dark' />
            </ScrollView>
        </SafeAreaView>
    )
}

export default App

