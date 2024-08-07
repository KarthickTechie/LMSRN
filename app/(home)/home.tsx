import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import SubHeader from "@/components/subheader";
import BannerTopComponent from "@/components/BannerTop";
import Dashboard from "@/components/Dashboard";
import { Ionicons } from "@expo/vector-icons";
import { dbServices } from "@/services";
import { DBSchemaConstants } from "@/constants";
const Home = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const testTable = async () => {
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.ORIG_ZONAL_MASTER
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.ORIG_BRANCH_MASTER
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.ORIG_STATIC_DATA_MASTERS
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.ORIG_STATE_MASTERS
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.PRODUCT_MAIN_CATEGORY
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.PRODUCT_SUB_CATEGORY
    );
    await dbServices.getTotalRowsByTableName(
      DBSchemaConstants.ORIG_CITY_MASTERS
    );
  };

  useEffect(() => {
    testTable();
  });

  return (
    <View className="flex column">
      <SubHeader />
      <BannerTopComponent />
      <View className="flex flex-column justify-center items-center mt-10">
        <View className="flex flex-row w-[100%]  justify-center items-center align-center ">
          <View className="w-[80%] pl-[25%]">
            <Text className="font-psemibold text-xl">LEAD DETAILS</Text>
          </View>
          <View
            className="
        flex justify-center items-center
        shadow
        bg-orange rounded-full w-[40px] h-[40px] "
          >
            <TouchableOpacity
              className=""
              // onPress={() => router.push("(leadtabs)/sourcing")}
              onPress={testTable}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-[85vw] h-[2px] bg-white m-2"></View>

        <Dashboard otherStyle="" />
      </View>
    </View>
  );
};

export default Home;
