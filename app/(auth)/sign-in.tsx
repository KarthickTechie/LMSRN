import { StyleSheet, Text, View ,ScrollView, Image,Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link,router } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { User } from '@/apptypes'

const SignIn = () => {
  const{setUser,setIsLoggedIn}=useGlobalContext()
  const[form,setForm] = useState<User>({email:'',password:''})
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
      

    }catch(error:any){
        Alert.alert('Error',error.message)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
       <View>
        
    
        <View>
       
          <Image 
          source={images.callcenterbanner}
          resizeMode='contain'
          className='top-[-100]'
          />
        </View>
        <View className="px-4 top-[-50vh] bg-[#fff] mx-3 opacity-[0.8]  
        rounded-xl border border-teal-400	shadow shadow-{50}">
          <View className='flex-1 w-full h-[60px] justify-center items-center	'>
       <Image 
       source={images.banklogo}
       resizeMode='contain'
       className='w-[100px] top-[10px]'
       />
       </View>
        <FormField 
        title="UserName"
        otherStyle="mt-5"
        value={form.email}
        handleChangeText={(e:string)=>setForm({...form,email:e})}
        placeholder="Enter User Name"
        keyBoardType="email-address"
        />
        <FormField 
        title="Password"
        otherStyle="mt-5"
        value={form.password}
        placeholder="Enter Password"
        handleChangeText={(e:string)=>setForm({...form,password:e})}
        keyBoardType="password"

        />
        <CustomButton 
        textStyles=""
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
        </View> 
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})