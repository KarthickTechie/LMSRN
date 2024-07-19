import { View, Text, TextInput, TextInputProps } from 'react-native'

export type StyledtextinputProps = {
    formikProps:any;
    label:string;
    formikkey:string;
    mandatory:boolean;
}   

const Styledtextinput = ({formikProps,label,formikkey,mandatory,...rest}:TextInputProps & StyledtextinputProps) => {
  return (
    <View className=''>
    <Text className='absolute pt-[-5] text-navy text-sm pl-3 w-full'>{label}
    { mandatory && <Text className='text-psemibold text-error'> *</Text> }

    </Text>

    <TextInput 
    className='p-2 mt-2 ml-2 border-b border-gray-100'
    onChangeText={formikProps.handleChange(formikkey)}
    onBlur={formikProps.handleBlur(formikkey)}
    {...rest}
    />
    <Text className='text-error px-3 '>{
      formikProps.touched[formikkey] && formikProps.errors[formikkey]}</Text>
    </View>
  )
}

export default Styledtextinput