import { StyleSheet, Text, View ,ScrollView, Image,Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link,router } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const{setUser,setIsLoggedIn}=useGlobalContext()
  const[form,setForm] = useState({email:'',password:''})
  const [isSubmitting,setIsSubmitting] = useState(false)
  const submit = async ()=>{
    const {email,password} = form
    if(!email || !password){
      Alert.alert('Error','Please fill all the fields..!!!')
      return
    }
    setIsSubmitting(true)
    try{
      const user =  await signIn(email,password)
      if(user)
        setUser(user)
        setIsLoggedIn(true)
        router.replace('/home')
      

    }catch(error){
        Alert.alert('Error',error.message)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-1 w-full h-full px-4 my-6 justify-center">
            <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px] mx-auto"
            />
            <Text className="text-white text-2xl text-center font-psemibold text-semibold">Login To Lorum</Text>
        </View>
        <View className="px-4">
        <FormField 
        title="UserName"
        otherStyle="mt-5"
        value={form.email}
        handleChangeText={(e)=>setForm({...form,email:e})}
        placeholder="Enter Email"
        keyBoardType="email-address"
        />
        <FormField 
        title="Password"
        otherStyle="mt-5"
        value={form.password}
        placeholder="Enter Password"
        handleChangeText={(e)=>setForm({...form,password:e})}
        keyBoardType="password"

        />
        <CustomButton 
        title="Submit"
        containerStyles="mt-5"
        handlePress={submit}
        isLoading={isSubmitting}
        />
        <View className="flex-row justify-center pt-10 gap-2">
        <Text className="text-lg text-gray-100 font-pregular">Don't you have account ?</Text>
        <Link href="/sign-up" className="text-lg text-secondary font-psemibold">Sign Up</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})