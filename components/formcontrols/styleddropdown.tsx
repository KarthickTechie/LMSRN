import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
];

export type StyledDropdownProps = {
  formikProps: any;
  placeholder: string;
  title: string;
  mandatory: boolean;
  formikkey: string;
  fieldsAlignStyle?: string;
  labeledAlignStyle?: string;
  fieldsGrpStyle?: string;
};

const StyledDropdown = ({
  formikProps,
  placeholder,
  title,
  mandatory,
  formikkey,
  fieldsAlignStyle,
  labeledAlignStyle,
  fieldsGrpStyle,
}: StyledDropdownProps) => {
  return (
    <View>
      <View className={fieldsGrpStyle}>
        <Text
          className={`text-navy text-sm px-3 pb-1 
          ${labeledAlignStyle ? labeledAlignStyle + ' pt-[10]' : "w-full absolute pt-[-5]"}`}
        >
          {title}
          {mandatory && <Text className="text-psemibold text-error"> *</Text>}
        </Text>
        <Dropdown
          mode="modal"
          style={
            fieldsAlignStyle ? [styles.dropdown, styles.w50] : styles.dropdown
          }
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
          onChange={(item) => {
            formikProps.setFieldValue(formikkey, item.value);
            console.log(`value => ${JSON.stringify(formikProps)}
                touched => ${formikProps.touched[formikkey]}
                error => ${formikProps.errors[formikkey]}
                `);
          }}
        />
      </View>
      <View>
        <Text className="text-error px-3 pb-1 text-right">
          {formikProps.touched[formikkey] && formikProps.errors[formikkey]}
        </Text>
      </View>
    </View>
  );
};

export default StyledDropdown;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 8, // 10 to 8
    marginLeft: 10, // 16 to 10
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  w50: {
    width: "55%"
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
