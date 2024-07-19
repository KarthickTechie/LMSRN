import { View, Text } from 'react-native'
import React  from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
  ];

export type StyledDropdownProps = {
    formikProps: any;
    placeholder:string;
    title:string;
    mandatory:boolean;
    formikkey:string;
}

const StyledDropdown = ({formikProps,placeholder,title,mandatory,formikkey}:StyledDropdownProps) => {

  return (
    <View>
    <Text className='absolute pt-[-5] text-navy text-sm px-3 pb-1 w-full'>{title}
       { mandatory && <Text className='text-psemibold text-error'> *</Text> }
    </Text>
    <Dropdown
        mode='modal'
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={700}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={formikProps.values[formikkey]}
        onChange={item => {
             formikProps.setFieldValue(formikkey,item.value)
            console.log(`value => ${JSON.stringify(formikProps)}
                touched => ${formikProps.touched[formikkey] }
                error => ${formikProps.errors[formikkey]}
                `)
        }}

     

        
      />
          <Text className='text-error px-3 pb-1 '>{
      formikProps.touched[formikkey] && formikProps.errors[formikkey]}
      </Text>

      </View>
  )
}

export default StyledDropdown

const styles = StyleSheet.create({
    dropdown: {
      marginTop: 10,
      marginLeft:16,
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

