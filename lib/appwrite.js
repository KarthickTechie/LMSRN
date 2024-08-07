import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { postMethod } from "./appAPIServices";
import { Alert } from "react-native";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.syarc.lms",
  projectId: "6682826100252d5757a8",
  databaseId: "668286b300224f2abd57",
  userCollectionId: "668286dc00040824e765",
  videoCollectionId: "66828704000cf0e54f30",
  storageId: "66828ac2003351432601",
};

// Init your React Native SDK
const client = new Client();
const {
  endpoint,
  projectId,
  platform,
  databaseId,
  userCollectionId,
  videoCollectionId,
} = appwriteConfig;
console.log(`endpoint ${endpoint} projectId ${projectId} platform ${platform}`);
client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId); // Your project ID
// .setPlatform(platform) // Your application ID or bundle ID.

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(`appwrite create user error => ${error}`);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    account.deleteSession("current");

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(`create session error => ${error}`);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();
    if (!currentAccount) throw Error;
    const currentUser = databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", (await currentAccount).$id),
    ]);
    if (!currentUser) throw new Error("No Current User");
    return (await currentUser).documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    return posts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

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
    throw new Error(error);
  }
};

export const getReverseGeocodeDetails = async (locationCode) => {
  try {
    const addressData = await Location.reverseGeocodeAsync(locationCode);
    console.log(addressData);
    return addressData;
  } catch (error) {
    throw new Error(error);
  }
};

// export const postDataToApi = async (apiClassName, apiMethod, req) => {
//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Username: "55655",
//       Password: "laps@1234",
//     },
//     body: JSON.stringify(req),
//   };
//   try {
//     const response = await postMethod(apiClassName, apiMethod, options);
//     const resData = await response.json();
//     return resData;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
