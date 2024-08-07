import { Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  HeaderParams,
  LovReferenceKey,
  Master,
  StaticMasterData,
  Lov,
} from "@/apptypes";
import MasterCard from "@/components/MasterCard";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { DBSchemaConstants, Endpoints } from "@/constants";
import axios from "axios";
import { deleteTableDataByTableNames } from "@/services";

// eslint-disable-next-line max-lines-per-function
const MasterPage = () => {
  const { updatemaster } = useLocalSearchParams<Record<string, string>>(); // fetch all masters
  /* static header value for lms app  */
  const [zonelist, setZonalList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [states, setStates] = useState();
  const [mainProducts, setMainProducts] = useState<any>();
  const [subProducts, setSubProducts] = useState<any>();
  const [lovList, setLovList] = useState<Lov[]>([]);
  const masterData: Master[] = StaticMasterData;

  const [mastersDownloaded, setMasterDownloaded] = useState<Master[]>([]);

  const [mastersNotDownloaded, setMasterNotDownloaded] =
    useState<Master[]>(masterData);
  const [isAllMastersLoaded, setIsAllMastersLoaded] = useState(false);
  const headers: HeaderParams = {
    username: "60011",
    password: "516edd40eedbe8194bc0e743fe75c59b",
  };

  const getZonalData = async () => {
    const response = await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/organisationsetup/`,
      method: "GET",
    });
    // setZonalList(response.data.zonalList);
    const temp = [...mastersNotDownloaded];
    temp[0].downloadStatus = true;
    setMasterNotDownloaded([...temp]);
  };

  const getBranchData = async (loginid: string) => {
    const response = await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/${Endpoints.branchMaster}/${loginid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userName: headers.username,
        password: headers.password,
      },
    });
    // setBranchList(response.data.branchList);
    const temp = [...mastersNotDownloaded];
    temp[1].downloadStatus = true;
    setMasterNotDownloaded([...temp]);
  };

  const getLovData = async () => {
    let lovArray: Lov[] = [];
    LovReferenceKey.forEach(async ({ name, id }) => {
      const response = await axios.request({
        url: `https://onlineucolps.in:450/lendperfect/${Endpoints.lovMaster}/${name}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userName: headers.username,
          password: headers.password,
        },
      });
      const lovCollection = response.data?.refereceData;
      if (lovCollection.length > 0) {
        const lovArrayWithMasterID = lovCollection.map((lov: any) => ({
          ...lov,
          masterid: id,
        }));
        lovArray = [...lovArray, lovArrayWithMasterID];
        //    setLovList(lovArray);
        const temp = [...mastersNotDownloaded];
        temp[4].downloadStatus = true;
        setMasterNotDownloaded([...temp]);
      }
    });
  };

  const getStatesData = async () => {
    const response = await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/getStatesList/indian_states`,
      method: "GET",
    });
    //  setStates(response.data.response);
    const temp = [...mastersNotDownloaded];
    temp[3].downloadStatus = true;
    setMasterNotDownloaded([...temp]);
  };

  const getMainProducts = async () => {
    const response = await axios.request({
      url: `https://onlineucolps.in:450/lendperfect/web/getMainAndSubCategory`,
      method: "GET",
    });
    if ("lpstpMainFacilitylist" in response) {
      //  setMainProducts(response.lpstpMainFacilitylist);
    }
    if ("lpstpsubFacilitylist" in response) {
      // setSubProducts(response.lpstpsubFacilitylist);
    }
    const temp = [...mastersNotDownloaded];
    temp[2].downloadStatus = true;
    setMasterNotDownloaded([...temp]);
  };

  useEffect(() => {
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
      ]).then(() => {
        try {
          getZonalData();
          getBranchData("60011");
          getMainProducts();
          getStatesData();
          getLovData();
          loadData();
        } catch (error) {
          alert(`${error}`);
        }
      });
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
    // if (mastersNotDownloaded.length > 0) {
    // const res = mastersNotDownloaded.splice(0, 1);
    // setMasterDownloaded([...mastersDownloaded, res[0]]);
    // setMasterNotDownloaded([...mastersNotDownloaded]);
    // setIsAllMastersLoaded(true);
    // Animated.timing(opacAnimation, {
    //   toValue: 1,
    //   useNativeDriver: true,
    //   duration: 2000,
    //   delay: 1000,
    // }).start();

    setTimeout(() => {
      router.push("/home");
    }, 2000);

    //  }
  };

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
                status={item.downloadStatus}
                index={index}
              />
            );
          })}
        {/* {isAllMastersLoaded && (
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
        )} */}
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
