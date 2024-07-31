import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  HeaderParams,
  Master,
  OrganizationMasterColumns,
  StaticMasterData,
} from "@/apptypes";
import MasterCard from "@/components/MasterCard";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useFetch } from "@/hooks/useFetch";
import { DBSchemaConstants, Endpoints } from "@/constants";
import * as ZonalMasterDataSource from "@/services/dbopsZonalMasters";
import { getColumns, prepareDB } from "@/services";
import { useDBUtils } from "@/hooks/useDBUtils";
import axios from "axios";

// eslint-disable-next-line max-lines-per-function
const MasterPage = () => {
  const { updatemaster } = useLocalSearchParams<Record<string, string>>(); // fetch all masters
  /* static header value for lms app  */
  const headers: HeaderParams = {
    username: "60011",
    password: "516edd40eedbe8194bc0e743fe75c59b",
  };
  const { data, error, loading, refetch } = useFetch(
    Endpoints.zonalmaster,
    headers
  );

  const getData = async () => {
    return await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/organisationsetup/`,
      method: "GET",
    });
  };
  useEffect(() => {
    alert(`${updatemaster} type => ${typeof updatemaster}`);

    // if orig_zonal
    // getData().then((response) => {
    //   const data: Record<string, string | number | null>[] =
    //     response.data["zonalList"];
    //   data.forEach((val) => {
    //     ZonalMasterDataSource.save(val);
    //   });
    // });
    // if (!error) {
    //   alert(data.length);
    //   data.forEach(async (val, index) => {
    //     if (index < 5) {
    //       ZonalMasterDataSource.save(val);
    //     }
    //   });
    // }
  }, []);
  // if (!error && db) {
  //   ZonalMasterDataSource.findAll();
  //   //console.log(data);
  //   //console.info(getColumns(OrganizationMasterColumns));
  //   // data.forEach(async (val, index) => {
  //   //   if (index <= 5) {
  //   //     save(db, val);
  //   //   }
  //   // });
  //   // save({
  //   //   orgCode: "1",
  //   //   orgId: "1",
  //   //   orgLevel: "R",
  //   //   orgName: "Chennai",
  //   //   orgScode: 1666,
  //   // });
  //   getTotalRowsByTableName(DBSchemaConstants.ORIG_ZONAL_MASTER);
  // } else {
  //   console.log(JSON.stringify(error));
  // }

  const opacAnimation = useRef(new Animated.Value(0)).current;

  const loadData = () => {
    console.log(`${mastersDownloaded.length} ${StaticMasterData.length} `);
    if (mastersNotDownloaded.length > 0) {
      const res = mastersNotDownloaded.splice(0, 1);
      setMasterDownloaded([...mastersDownloaded, res[0]]);
      setMasterNotDownloaded([...mastersNotDownloaded]);
      if (mastersNotDownloaded.length === 0) {
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
              className="
        text-xl font-pregular text-white align-center leading-10"
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
