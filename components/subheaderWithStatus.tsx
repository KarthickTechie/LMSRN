import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Battery from 'expo-battery';
import * as Network from 'expo-network';
import * as SecureStore from "expo-secure-store";
import { useGlobalContext } from "@/context/GlobalProvider";

const SubHeaderWithStatus = () => {
  const contextData = useGlobalContext();
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [networkData, setNetworkData] = useState<Network.NetworkState | null>(null);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    };

    fetchBatteryLevel();

    const networkDetails = async () => {
      const netData = await Network.getNetworkStateAsync();
      setNetworkData(netData);
    };

    networkDetails();

    // Optionally, you can listen for battery level updates
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    return () => {
      subscription.remove();
    };

  })

  return (
    <View className="flex w-[100vw] h-[30px] bg-navy justify-center items-center">
      <View className="flex flex-row">
        <Text className="w-[33%] text-center">GPS : {contextData.gpsData} </Text>
        <Text className="w-[33%] text-center">Internet : {networkData ? (networkData.isConnected ? 'ON' : 'OFF') : ''}</Text>
        <Text className="w-[33%] text-center">Battery : {batteryLevel !== null ? (batteryLevel * 100).toFixed(2) : ''}%</Text>
      </View>

    </View>
  );
};

export default SubHeaderWithStatus;
