/**
@author: Lathamani,
date: 24-07-2024
@description: Client Visit report page. 
*/

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyledDropdown, Styledtextinput } from "@/components/formcontrols";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { ClientVisitFormInitialData } from "@/apptypes/AppStaticData";
import { ClientVisitFormValidationSchema } from "@/apptypes/AppValidationSchemas";
import StyledTextAreaInput from "@/components/formcontrols/styledTextAreaInput";
import { router } from "expo-router";
import * as AppType from "@/apptypes/AppTypes";
import moment from "moment";
import LoadingControl from "@/components/loading";
import { postMethod } from "@/lib/appAPIServices";
import { dbopsMainProductsMasters, dbopsStaticDataMasters } from "@/services";
import { Endpoints } from "@/constants";
import { getLocationCoordinates } from "@/lib/geoLocationService";
import { AlertMessage } from "@/apptypes/AppStaticMessage";

const validationSchema = ClientVisitFormValidationSchema;

const VisitReport = () => {
  const [initialFormData, setInitialFormData] =
    useState<AppType.ClientVisitFormData>(ClientVisitFormInitialData);
  const [isLoading, setIsLoading] = useState(false);
  const [loanProdList, setLoanProdList] = useState<AppType.KeyValueString[]>([]);
  const [leadCategoryList, setLeadCategoryList] = useState<AppType.KeyValueString[]>([]);

  useEffect(() => {
    const fectLocation = async () => {
      let dateVisit = moment(new Date()).format("DD/MM/YY");
      let timeVisit = moment(new Date().getTime()).format("HH:mm");
      const locationVal = await getLocationCoordinates();
      if (locationVal != undefined && locationVal != null) {
        const setInitData = {
          ...initialFormData,
          dateOfVisit: dateVisit,
          timeOfVisit: timeVisit,
          latitude: locationVal.locationCode.latitude.toString(),
          longitude: locationVal.locationCode.longitude.toString(),
          ...locationVal.address
        };
        setInitialFormData(setInitData);
      }
    };
    fectLocation();
    getLoanProductData();
    getLeadCategory();
  }, []);

  const getLoanProductData = async () => {
    try {
      const loanProducts = await dbopsMainProductsMasters.findAll();
      if (loanProducts) {
        setLoanProdList(loanProducts);
      }
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  }

  const getLeadCategory = async () => {
    try {
      const leadCategory = await dbopsStaticDataMasters.findBasedOnMasterId(AppType.StaticDataMasterId.LeadCategory);
      setLeadCategoryList(leadCategory);
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  }

  const submitClientForm = async (values: FormikValues, action: FormikHelpers<AppType.ClientVisitFormData>) => {
    try {
      setIsLoading(true);
      const userId = "55655";
      const reqBody: AppType.ClientVisitRequest = {
        cvdSeqid: "0",
        cvdName: values.name,
        cvdMobile: values.mobileNo,
        cvdProduct: values.interestPrd,
        cvdloanAmtReq: values.loanAmt,
        cvdLatitude: values.latCode,
        cvdLongitude: values.lonCode,
        cvdAddress1: values.address1,
        cvdAddress2: values.address2,
        cvdState: values.state,
        cvdCity: values.city,
        cvdPincode: values.pincode,
        cvdRemarks: values.remarks,
        cvdLocation: "", // branch
        cvdLeadType: values.leadCategory,
        cvdVisitDate: values.dateOfVisit,
        cvdVisitTime: values.timeOfVisit,
        cvdCreatedBy: "55655",
        cvdCreatedOn: "",
        cvdModifiedBy: "55655", // username
        cvdModifiedOn: "",
      };
      let resp = await postMethod(
        `${Endpoints.saveClientVisit}/${userId}`,
        reqBody
      );
      if (resp.status == AppType.ResponseStatusCode.STATUSOK) {
        setIsLoading(false);
        action.resetForm();
        action.setSubmitting(true);
        Alert.alert(AlertMessage.ClientVisitSubmitted);
      } else {
        setIsLoading(false);
        Alert.alert(AlertMessage.ResponseFailed);
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert(JSON.stringify(err));
    }
  };

  return (
    <KeyboardAvoidingView>
      {isLoading && <LoadingControl isLoading={isLoading} />}
      <ScrollView>
        <View className="py-5 px-2">
          <Formik
            initialValues={initialFormData}
            onSubmit={(values, action) => submitClientForm(values, action)}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(formikProps: FormikValues) => (
              <>
                <Styledtextinput
                  label="Name"
                  formikProps={formikProps}
                  formikkey="name"
                  placeholder="Enter Name"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />
                <Styledtextinput
                  label="Date Of Visit"
                  formikProps={formikProps}
                  formikkey="dateOfVisit"
                  placeholder=""
                  editable={false}
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />
                <Styledtextinput
                  label="Time Of Visit"
                  formikProps={formikProps}
                  formikkey="timeOfVisit"
                  placeholder=""
                  editable={false}
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />
                <Styledtextinput
                  label="Mobile Number"
                  formikProps={formikProps}
                  formikkey="mobileNo"
                  placeholder="Enter Mobile number"
                  mandatory={true}
                  editable={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />
                <StyledDropdown
                  placeholder="Select Product"
                  title="Interest Product"
                  mandatory={true}
                  dropdownData={loanProdList}
                  dropLableProperty="facDesc"
                  dropValueProperty="facId"
                  formikProps={formikProps}
                  formikkey="interestPrd"
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w50"
                  labeledAlignStyle="w-[40%]"
                />
                <Styledtextinput
                  label="Loan Amount"
                  formikProps={formikProps}
                  formikkey="loanAmt"
                  placeholder="Enter Amount"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />
                <StyledDropdown
                  placeholder="Select Lead Category"
                  title="Lead Category"
                  mandatory={true}
                  dropdownData={leadCategoryList}
                  dropLableProperty="rdValueDescription"
                  dropValueProperty="rdValueCode"
                  formikProps={formikProps}
                  formikkey="leadCategory"
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w50"
                  labeledAlignStyle="w-[40%]"
                />

                <StyledTextAreaInput
                  label="Reason"
                  formikProps={formikProps}
                  formikkey="reason"
                  placeholder="Enter Reason"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <StyledTextAreaInput
                  label="Remarks"
                  formikProps={formikProps}
                  formikkey="remarks"
                  placeholder="Enter Remarks"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="Latitude"
                  formikProps={formikProps}
                  formikkey="latitude"
                  editable={false}
                  placeholder="Fetch Location"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="Longitude"
                  formikProps={formikProps}
                  formikkey="longitude"
                  editable={false}
                  placeholder="Fetch Location"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="Address 1"
                  formikProps={formikProps}
                  formikkey="address1"
                  editable={false}
                  placeholder="Enter Address 1"
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="Address 2"
                  formikProps={formikProps}
                  formikkey="address2"
                  placeholder="Enter Address 2"
                  editable={false}
                  mandatory={false}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="State"
                  formikProps={formikProps}
                  formikkey="state"
                  placeholder=""
                  editable={false}
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="City"
                  formikProps={formikProps}
                  formikkey="city"
                  placeholder=""
                  editable={false}
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <Styledtextinput
                  label="Pincode"
                  formikProps={formikProps}
                  formikkey="pincode"
                  placeholder="Enter Pincode"
                  editable={false}
                  mandatory={true}
                  fieldsGrpStyle="flex flex-row items-center"
                  fieldsAlignStyle="w-[55%]"
                  labeledAlignStyle="w-[40%]"
                />

                <View className="flex flex-row mt-5 justify-center">
                  <View className="mx-2">
                    <TouchableOpacity className="bg-amber-500 rounded py-2 px-4 text-light" onPress={formikProps.handleSubmit}>
                      <Text className="text-base font-medium">{AppType.AppButtons.SUBMIT}</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="mx-2">
                    <TouchableOpacity className="bg-blue-500 rounded py-2 px-4 text-light" onPress={() => router.push("home")}>
                      <Text className="text-base font-medium text-white">{AppType.AppButtons.NEXT}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VisitReport;

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10,
  },
});
