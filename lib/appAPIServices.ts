import axios, { AxiosResponse } from "axios";
import * as AppType from "@/apptypes/AppTypes";

export let apiURL = AppType.APIURL.PRODURL;

export let options = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Username: "55655",
  Password: "laps@1234",
};

export const postMethod = async (
  apiClassName: string,
  apiMethod: string,
  reqBody: any
) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/${apiClassName}/${apiMethod}`,
      reqBody,
      { headers: options }
    );
    console.log(data, "response");
    return data;
  } catch (error) {
    return error;
  }
};
