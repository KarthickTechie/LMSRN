import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { Alert } from "react-native";
import * as AppType from "@/apptypes/AppTypes";

export const getGpsStatus = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission to access location was denied");
    return "OFF";
  } else {
    return "ON";
  }
};

export const getLocationCoordinates = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permission to access location was denied");
    } else {
      SecureStore.setItemAsync("gpsStatus", "ON");
    }
    const locationData = await Location.getCurrentPositionAsync({});
    if (locationData && locationData.coords) {
      let { latitude, longitude, altitude, accuracy } = locationData.coords;
      const addressData = await getReverseGeocodeDetails({
        latitude,
        longitude,
        altitude,
        accuracy,
      });
      let addData = {
        address1:
          addressData && addressData.length > 0
            ? addressData[0].formattedAddress
            : "",
        address2:
          addressData && addressData.length > 0 ? addressData[0].street : "",
        city: addressData && addressData.length > 0 ? addressData[0].city : "",
        district:
          addressData && addressData.length > 0 ? addressData[0].district : "",
        state:
          addressData && addressData.length > 0 ? addressData[0].region : "",
        country:
          addressData && addressData.length > 0 ? addressData[0].country : "",
        pincode:
          addressData && addressData.length > 0
            ? addressData[0].postalCode
            : "",
      };
      return {
        locationCode: { latitude, longitude, altitude, accuracy },
        address: addData,
      };
    }
  } catch (error) {
    // throw new Error(error);
    if (error instanceof Error) Alert.alert(`${error.message}`);
    else Alert.alert(`Location fecting error.`);
  }
};

export const getReverseGeocodeDetails = async (
  locationCode: AppType.LocationCoord
) => {
  try {
    const addressData = await Location.reverseGeocodeAsync(locationCode);
    console.log(addressData);
    return addressData;
  } catch (error) {
    if (error instanceof Error) Alert.alert(`${error.message}`);
    else Alert.alert(`Location Address details fecting error.`);
  }
};
