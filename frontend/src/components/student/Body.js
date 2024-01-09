import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import ShowNotice from "../notices/ShowNotice";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import Notice from "../notices/Notice";

const StatisticsCard = ({ iconComponent, label, value }) => (
  <div className="flex items-center space-x-4 border-r-2">
    {iconComponent}
    <div className="flex flex-col">
      <h1>{label}</h1>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  </div>
);

const CalendarSection = ({ value, onChange }) => (
  <div className="flex space-x-4">
    {/* Calendar component */}
  </div>
);

const NoticesSection = ({ open, setOpen, openNotice, setOpenNotice, notices }) => (
  <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col pt-3">
    {/* Notices rendering logic */}
  </div>
);

const Body = () => {
  // State and selector definitions

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>

        {/* Statistics Section */}
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          {/* Statistics Cards */}
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4">
            {/* Statistics Cards */}
          </div>

          {/* Calendar and Notices */}
          <CalendarSection value={value} onChange={onChange} />

          <NoticesSection
            open={open}
            setOpen={setOpen}
            openNotice={openNotice}
            setOpenNotice={setOpenNotice}
            notices={notices}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
