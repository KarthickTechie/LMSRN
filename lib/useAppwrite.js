import { useState, useEffect } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const refetch = () => fetchData();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const posts = await fn();
      console.log(posts.documents.length);
      setData(posts);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { data, refetch, isLoading };
};

export default useAppwrite;
