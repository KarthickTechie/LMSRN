import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { HeaderParams } from "@/apptypes";

export const useFetch = (endpoint: string, headerParams: HeaderParams) => {
  const [data, setData] = useState<Record<string, string | number | null>[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const options: AxiosRequestConfig = {
    url: `https://onlineucolps.in:450/lendperfect/${endpoint}`,
    //url: "../data/organizations.json",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: headerParams.username,
      password: headerParams.password,
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data["zonalList"]);
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

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, error, loading, refetch };
};
