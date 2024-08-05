import { View, Text, Animated } from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Master, StaticMasterData } from "@/apptypes";
import MasterCard from "@/components/MasterCard";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
const MasterPage = () => {
  const opacAnimation = useRef(new Animated.Value(0)).current;

  const loadData = () => {
    console.log(`${mastersDownloaded.length} ${StaticMasterData.length} `);
    if (mastersNotDownloaded.length > 0) {
      const res = mastersNotDownloaded.splice(0, 1);
      setMasterDownloaded([...mastersDownloaded, res[0]]);
      setMasterNotDownloaded([...mastersNotDownloaded]);
      if (mastersNotDownloaded.length == 0) {
        Animated.timing(opacAnimation, {
          toValue: 1,
          useNativeDriver: true,
          duration: 2000,
          delay: 1000,
        }).start();
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    }
  };
  const masterData: Master[] = StaticMasterData;

  const [mastersDownloaded, setMasterDownloaded] = useState<Master[]>([]);

  const [mastersNotDownloaded, setMasterNotDownloaded] =
    useState<Master[]>(masterData);

  return (
    <>
      <Animated.View
        className="flex-1 
    justify-center align-center items-center bg-primary
"
      >
        {mastersDownloaded.length > 0 &&
          mastersDownloaded.map((item, index) => {
            return (
              <MasterCard
                key={index}
                title={item.masterType}
                opacity={0}
                status={true}
                classProps="top-[-20px]"
                index={index}
              />
            );
          })}
        {mastersNotDownloaded.length > 0 &&
          mastersNotDownloaded.map((item, index) => {
            return (
              <MasterCard
                key={index}
                title={item.masterType}
                opacity={0}
                status={false}
                index={index}
              />
            );
          })}
        {mastersNotDownloaded.length == 0 && (
          <Animated.View
            style={{ opacity: opacAnimation }}
            className="flex column w-[90vw] justify-center items-center border border-lime-100 m-5 p-2 rounded-lg"
          >
            <FontAwesome
              name="thumbs-up"
              size={40}
              color="#FF9C01"
              className="m-10"
            />
            <Text
              className="text-xl font-pregular text-white align-center leading-10"
            >
              All Masters are downloaded successfully
            </Text>
          </Animated.View>
        )}
      </Animated.View>
      <CustomButton
        textStyles=""
        title="Animate"
        containerStyles="mt-5"
        handlePress={loadData}
        isLoading={false}
      />
    </>
  );
};

export default MasterPage;
