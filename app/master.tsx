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
import axios from "axios";
import { deleteTableDataByTableNames } from "@/services";
import { ref } from "yup";

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

  const getZonalData = async () => {
    return await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/organisationsetup/`,
      method: "GET",
    });
  };

  const getBranchData = async (loginid: string) => {
    return await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/get-all-branches/${loginid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: headers.username,
        password: headers.password,
      },
    });
  };

  const getLovData = async (refkey: string) => {
    return await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/reference-data/${refkey}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: headers.username,
        password: headers.password,
      },
    });
  };

  const getStatesData = async () => {
    return await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/getStatesList/indian_states`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: headers.username,
        password: headers.password,
      },
    });
  };

  useEffect(() => {
    alert(`${updatemaster} type => ${typeof updatemaster}`);
    if (updatemaster) {
      // if updatemaster query param true , all the masterdata in tables will be deleted
      // and fresh insert will happen
      deleteTableDataByTableNames([
        DBSchemaConstants.ORIG_ZONAL_MASTER,
        DBSchemaConstants.ORIG_BRANCH_MASTER,
        DBSchemaConstants.ORIG_STATIC_DATA_MASTERS,
        DBSchemaConstants.ORIG_STATE_MASTERS,
        DBSchemaConstants.ORIG_CITY_MASTERS,
        DBSchemaConstants.PRODUCT_MAIN_CATEGORY,
        DBSchemaConstants.PRODUCT_SUB_CATEGORY,
      ]);
      console.log(data ? data.zonalList : error);

      refetch(`${Endpoints.branchMaster}${headers.username}`);

      console.log(data ? data.branchList : error);
    } else {
      // if updatemaster query param false then no masterdata in tables
      // and fresh insert will happen
    }
    // if orig_zonal
    // getZonalData().then((response) => {
    //   const data: Record<string, string | number | null>[] =
    //     response.data["zonalList"];
    //   data.forEach((val) => {
    //     ZonalMasterDataSource.save(val);
    //   });
    // });
  }, []);
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
