import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { HeaderParams } from "@/apptypes";
import { Endpoints } from "@/constants";

export const useFetch = (endpoint: string, headerParams: HeaderParams) => {
  const [data, setData] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async (endpoint = Endpoints.zonalmaster) => {
    const options: AxiosRequestConfig = {
      url: `https://onlineucolps.in:450/lendperfect/${endpoint}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userName: headerParams.username,
        password: headerParams.password,
      },
    };

    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      throw new Error(`API Request Error in ${endpoint}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (endpoint: string) => {
    setLoading(true);
    fetchData(endpoint);
  };

  return { data, error, loading, refetch };
};
