import Error from "@/components/error";
import type { DashboardData } from "@/lib/types";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

function Blogs() {
  const [blogsData, setBlogsData] = useState<DashboardData | null>(null);
  
    const getBlogsData = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.BLOG_POSTS.GET_ALL
        );
  
        console.log("Blogs Data: ", response);
  
        if (response.data) {
          setBlogsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data...");
      }
    };
  
    useEffect(() => {
      getBlogsData();
  
      return () => {};
    }, []);
  return (
    <div>
      {blogsData ? (
        <div>Fetched Blog Data</div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Blogs;
