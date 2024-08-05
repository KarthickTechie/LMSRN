import { View, Text, TextInput, TextInputProps } from "react-native";

export type StyledTextAreaInputProps = {
  formikProps: any;
  label: string;
  formikkey: string;
  mandatory: boolean;
  fieldsGrpStyle?: string;
  fieldsAlignStyle?: string;
  labeledAlignStyle?: string;
};

const StyledTextAreaInput = ({
  formikProps,
  label,
  formikkey,
  mandatory,
  fieldsGrpStyle,
  fieldsAlignStyle,
  labeledAlignStyle,
  ...rest
}: TextInputProps & StyledTextAreaInputProps) => {
  return (
    <View>
      <View className={`${fieldsGrpStyle ? fieldsGrpStyle + ' mb-1' : ''}`}>
        <Text className={`text-navy text-sm pl-3 ${labeledAlignStyle ? labeledAlignStyle + ' pt-[5]' : 'w-full absolute pt-[-5]'}`}>
          {label}
          {mandatory && <Text className="text-psemibold text-error"> *</Text>}
        </Text>

        <TextInput
          numberOfLines={5}
          multiline={true}
          className={`mt-1 ml-2 border-b border-gray-100 ${fieldsAlignStyle ? fieldsAlignStyle + ' px-2 py-1' : 'p-2'}`}
          onChangeText={formikProps.handleChange(formikkey)}
          onBlur={formikProps.handleBlur(formikkey)}
          value={formikProps.values[formikkey]}
          {...rest}
        />
      </View>
      <View>
        <Text className="text-error px-3 text-right">
          {formikProps.touched[formikkey] && formikProps.errors[formikkey]}
        </Text>
      </View>
    </View>
  );
};

export default StyledTextAreaInput;
