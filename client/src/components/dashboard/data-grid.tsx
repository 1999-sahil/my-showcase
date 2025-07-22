import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/context/userContext";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import moment from "moment";
import {
  Bot,
  Briefcase,
  Calendar,
  Layers2,
  PenLine,
  Timer,
} from "lucide-react";
import Error from "../error";
import Stats from "./stats";
import type { DashboardData } from "@/lib/types";
import BlogTagInsights from "./tag-insights";
import TopBlogPosts from "./blog-posts";
import TopProjects from "./top-projects";

function DataGrid() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
      );

      console.log("DATA_GRID: ", response);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data...");
    }
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <div className="w-full h-full">
      {dashboardData ? (
        <div className="p-2 space-y-3 lg:space-y-5 mt-4">
          {/** Welcome */}
          <div className="flex items-center justify-between">
            <span className="max-w-lg space-y-1">
              <h2 className="font-poppins font-semibold text-xl lg:text-2xl text-[#111] dark:text-neutral-100">
                Welcome Back, Sahil! 👋
              </h2>
              <p className="text-xs font-poppins font-normal text-neutral-600 dark:text-neutral-400">
                Good to see you again! Your dashboard is ready to roll.
              </p>
            </span>
            <div className="hidden lg:flex items-center gap-2">
              <span className="flex items-center gap-2 font-mono text-xs border rounded-md px-1.5 py-1">
                <Calendar className="size-3.5" />
                {moment().format("LL")}
              </span>
              <span className="flex items-center gap-2 font-mono text-xs border rounded-md px-1.5 py-1">
                <Timer className="size-3.5" />
                {moment().format("dddd")}, {moment().format("LT")}
              </span>
            </div>
          </div>

          {/** Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            <Stats
              title="blogs"
              count={dashboardData?.stats?.totalPosts}
              icon={Layers2}
            />
            <Stats
              title="projects"
              count={dashboardData?.stats?.totalProjects}
              icon={Briefcase}
            />
            <Stats
              title="notes"
              count={dashboardData?.stats?.totalNotes}
              icon={PenLine}
            />
            <Stats
              title="ai"
              count={dashboardData?.stats?.aiGenerated}
              icon={Bot}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-5">
            {/** blogs tag insights pie chart */}
            <div className="col-span-12 md:col-span-6 bg-white dark:bg-neutral-900/50 border rounded-md p-4">
              <span className="font-poppins font-medium text-[#333] dark:text-neutral-200">
                Tags Insights
              </span>
              <BlogTagInsights tagUsage={dashboardData?.tagUsage || []} />
            </div>

            {/** top posts */}
            <div className="col-span-12 md:col-span-6 bg-white dark:bg-neutral-900/50 border rounded-md p-4">
              <span className="font-poppins font-medium text-[#333] dark:text-neutral-200">
                Top Blog Posts
              </span>
              <div className="flex flex-col gap-4 mt-6">
                {dashboardData?.topPosts?.slice(0, 3)?.map((post) => (
                  <TopBlogPosts
                    key={post._id}
                    title={post.title}
                    coverImageUrl={post.coverImageUrl}
                    views={post.views}
                    createdAt={post.createdAt}
                  />
                ))}
              </div>
            </div>

            {/** top projects */}
            <div className="col-span-12 bg-white dark:bg-neutral-900/50 border rounded-md p-4">
              <span className="font-poppins font-medium text-[#333] dark:text-neutral-200">
                Top Projects
              </span>
              <div className="overflow-x-auto mt-6 rounded-md">
                <table className="min-w-full table-auto text-sm">
                  <thead className="bg-stone-100 dark:bg-neutral-900 font-mono text-xs">
                    <tr>
                      <th className="hidden lg:block p-3 text-left font-semibold text-neutral-500 dark:text-gray-400">
                        ID
                      </th>
                      <th className="p-3 text-left font-semibold text-neutral-500 dark:text-gray-400">
                        Project Name
                      </th>
                      <th className="p-3 text-left font-semibold text-neutral-500 dark:text-gray-400">
                        Live
                      </th>
                      <th className="p-3 text-left font-semibold text-neutral-500 dark:text-gray-400">
                        Repo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboardData?.topProjects?.slice(0, 3)?.map((project) => (
                      <TopProjects
                        key={project._id}
                        projectName={project.projectName}
                        liveUrl={project.liveUrl}
                        repoUrl={project.repoUrl}
                        id={project._id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default DataGrid;
