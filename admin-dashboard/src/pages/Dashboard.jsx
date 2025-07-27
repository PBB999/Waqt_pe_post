import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MiniStatistic from "@/components/custom/Ministatistics";
import {
  Card
} from "@/components/ui/card";

import ActivePostmen from "../components/custom/ActivePostmen";
import TopPerformingPostmen from "../components/custom/TopPerformingPostman";
import ComplaintTrends from "../components/custom/ComplaintTrends";
import DeliverySuccessRate from "../components/custom/DeliverySuccessRate";
import ActionButtons from "../components/custom/ActionButtons";

function Dashboard() {
  return (
    <Card className="rounded ">
      <div className="grid grid-cols-1 gap-5 my-5 w-full">
        <ActionButtons />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <ComplaintTrends />
        <DeliverySuccessRate />
      </div>

      <div className="bg-white  shadow-inner shadow-[#F8F8F8] ">
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 p-5">
          <MiniStatistic
            startContent={<span className="text-lg">📈</span>}
            endContent={
              <span className="text-blue-500 hover:underline">View More</span>
            }
            name="Pending Deliveries"
            growth="+15%"
            value="1189"
            growthColor="text-blue-500"
          />{" "}
          <MiniStatistic
            startContent={<span className="text-lg">📈</span>}
            endContent={
              <span className="text-blue-500 hover:underline">View More</span>
            }
            name="Completed Deliveries"
            growth="+5%"
            value="5689"
            growthColor="text-blue-500"
          />
          <MiniStatistic
            startContent={<span className="text-lg">📉</span>}
            endContent={
              <span className="text-red-800 hover:underline">View More</span>
            }
            name="In Progress Deliveries"
            growth="-3%"
            value="271"
            growthColor="text-red-800"
          />
          <MiniStatistic
            startContent={<span className="text-lg">📉</span>}
            endContent={
              <span className="text-red-800 hover:underline">View More</span>
            }
            name="Returned Deliveries"
            growth="4%"
            value="320"
            growthColor="text-red-800"
          />
        </div>

        <div className="flex">
          <div className="lg:w-1/2 p-5">
            <ActivePostmen />
          </div>
          <div className="lg:w-1/2 p-5">
            <TopPerformingPostmen />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Dashboard;
