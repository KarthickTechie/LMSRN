/**
@author: Lathamani,
date: 23-07-2024
@description: Attendance page. 
*/

import { Alert, Dimensions, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeaderWithStatus from "@/components/subheaderWithStatus";
import PunchTimeDateBlock from "@/components/punchTimeDate";
import MapView, { MapMarker } from "react-native-maps";
import { router } from "expo-router";
import * as AppType from "@/apptypes/AppTypes";
import * as SecureStore from 'expo-secure-store';
import moment from "moment";
import LoadingControl from "@/components/loading";
import { postMethod } from "@/lib/appAPIServices";
import CustomButton from "@/components/CustomButton";
import { Endpoints } from "@/constants";
import { getLocationCoordinates } from "@/lib/geoLocationService";
import { AlertMessage } from "@/apptypes/AppStaticMessage";

const Attendance = () => {
  const initPunchData = { punchType: '', time: '', date: '' };
  const [locationData, setLocation] = useState<AppType.LocationCoord>({ latitude: 0, longitude: 0, altitude: 0, accuracy: 0 });
  const { latitude, longitude } = locationData;
  const [deltaData, setLocationDelta] = useState({ latDelta: 0.04, lngDelta: 0.05 });
  const [addressData, setAddressData] = useState<AppType.LocationAddressData>({ address1: '', address2: '', city: '', district: '', state: '', country: '', pincode: '' });
  const [punchInDisable, setPunchInDisable] = useState(false);
  const [punchOutDisable, setPunchOutDisable] = useState(false);
  const [punchInType, setPunchInType] = useState<AppType.PunchTypeData>(initPunchData);
  const [punchOutType, setPunchOutType] = useState<AppType.PunchTypeData>(initPunchData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let todayDate = moment(new Date()).format('DD-MM-YYYY');
      const punchInData = await getValueFor('punchIn');
      const punchOutData = await getValueFor('punchOut');
      if (punchInData == todayDate) {
        if (punchOutData) {
          setPunchOutDisable(true);
          setPunchInDisable(true);
          setPunchOutType(punchOutData);
        }
        if (punchInData) {
          setPunchInDisable(true);
          setPunchInType(punchInData)
        }
      } else {
        SecureStore.deleteItemAsync('punchIn');
        SecureStore.deleteItemAsync('punchOut');
      }
      const locationVal = await getLocationCoordinates();
      const { width, height } = Dimensions.get("window");
      if (locationVal) {
        let latDelta = locationVal.locationCode.latitude - locationVal.locationCode.longitude;
        let lngDelta = latDelta * (width / height);
        setAddressData(locationVal.address);
        setLocationDelta({ latDelta, lngDelta });
        setLocation(locationVal.locationCode);
      }
    })();
  }, []);

  const getValueFor = async (val: string) => {
    let result = await SecureStore.getItemAsync(val);
    if (result) {
      return JSON.parse(result);
    } else {
      return null;
    }
  }

  const attendanceSubmit = async (val: string) => {
    try {
      setIsLoading(true);
      let req: AppType.AttendanceSaveReq = {
        lnUserId: '55655',
        lnOrgCode: '012323',
        lnAddressline1: addressData.address1 ? addressData.address1 : '',
        lnAddressline2: addressData.address2 ? addressData.address2 : '',
        lnLatitude: latitude,
        lnLongitude: longitude,
        lnCity: addressData.city ? addressData.city : '',
        lnState: addressData.state ? addressData.state : '',
        lnZip: addressData.pincode ? addressData.pincode : '',
        lnCountry: addressData.country ? addressData.country : '',
      };
      const resp = await postMethod(Endpoints.userAttendance, req);
      if (resp.code == 200) {
        if (val == 'in') {
          let punIn = {
            punchType: AppType.AttendancePunch.PUNCHIN,
            time: new Date().toLocaleTimeString(),
            date: moment(new Date()).format('DD/MM/YY')
          }
          setPunchInDisable(true);
          setPunchInType(punIn);
          SecureStore.setItemAsync('punchIn', JSON.stringify(punIn));
        } else {
          let punOut = {
            punchType: AppType.AttendancePunch.PUNCHOUT,
            time: new Date().toLocaleTimeString(),
            date: moment(new Date()).format('DD/MM/YY')
          }
          setPunchOutDisable(true);
          setPunchOutType(punOut);
          SecureStore.setItemAsync('punchOut', JSON.stringify(punOut));
        }
        setIsLoading(false);
        Alert.alert(resp.status);
      } else {
        setIsLoading(false);
        Alert.alert(`${AlertMessage.ResponseFailed}. ${resp.status}`);
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert(JSON.stringify(err));
    }
  }

  return (
    <>
      {isLoading && <LoadingControl isLoading={isLoading} />}
      <View className="flex column">
        <SubHeaderWithStatus />
        <PunchTimeDateBlock
          punchIn={punchInType}
          punchOut={punchOutType} />

        <View className="flex items-center justify-center bg-gray-300 py-1">
          <Text> My Location: {latitude}, {longitude}</Text>
        </View>

        <View className="relative">
          <MapView className="w-[100%] h-[100%] item-center"
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: deltaData.latDelta,
              longitudeDelta: deltaData.lngDelta
            }}
            zoomControlEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation={true}
          >
            <MapMarker coordinate={{
              latitude: latitude,
              longitude: longitude
            }} />

          </MapView>
        </View>
        <View className="flex flex-col absolute justify-center w-[100%] items-center bottom-[159px]">
          <View className="flex flex-row w-[100%] justify-between items-center my-4 px-8">
            <CustomButton
              title={AppType.AttendancePunch.PUNCHIN}
              handlePress={() => attendanceSubmit('in')}
              containerStyles="w-[40%] mt-2 min-h-[48px] rounded-sm bg-blue-500"
              textStyles="text-base text-white" isLoading={punchInDisable} />

            <CustomButton
              title={AppType.AttendancePunch.PUNCHOUT}
              handlePress={() => attendanceSubmit('out')}
              containerStyles="w-[40%] mt-2 min-h-[48px] rounded-sm bg-blue-500"
              textStyles="text-base text-white" isLoading={punchOutDisable}
            />
          </View>
          <View className="w-full">
            <CustomButton
              title={AppType.AppButtons.BACK}
              handlePress={() => router.push('home')}
              containerStyles="w-full mt-0.5 min-h-[50px] rounded-sm"
              textStyles={''} isLoading={false} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Attendance;
