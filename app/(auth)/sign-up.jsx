import { StyleSheet, Text, View ,ScrollView, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const{setUser,setIsLoggedIn}=useGlobalContext()
  const[form,setForm] = useState({username:'',email:'',password:''})
  const [isSubmitting,setIsSubmitting] = useState(false)
  const submit = async ()=>{
    const {username,email,password} = form
    if(!username || !email || !password){
      Alert.alert('Error','Please fill all the fields..!!!')
      return
    }
    setIsSubmitting(true)
    try{
      const user =  await createUser(email,password,username)
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
            <Text className="text-white text-2xl text-center font-psemibold text-semibold">Signup To Aora</Text>
        </View>
        <View className="px-4">
        <FormField 
        title="UserName"
        otherStyle="mt-5"
        value={form.username}
        handleChangeText={(e)=>setForm({...form,username:e})}
        placeholder="Enter Username"
        />
        <FormField 
        title="Email"
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
        <Text className="text-lg text-gray-100 font-pregular">Already have an account ?</Text>
        <Link href="/sign-in" className="text-lg text-secondary font-psemibold">Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})