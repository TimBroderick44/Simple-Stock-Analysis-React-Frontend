import React from "react";
import style from "./Content.module.scss";
import Tab from "./tabs/Tab";
import Home from "./tabs/home/Home";
import DailyAverage from "./tabs/dailyAverage/DailyAverage";
import HourlyMax from "./tabs/hourlyMax/HourlyMax";
import DailyVolume from "./tabs/dailyVolume/DailyVolume";
import MovingAverage from "./tabs/movingAverage/MovingAverage";

function Content() {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <div className={style.content}>
      <div className={style.tabContainer}>
        <Tab onClick={() => setActiveTab("home")}>Home</Tab>
        <Tab onClick={() => setActiveTab("daily_avg")}>Daily Average</Tab>
        <Tab onClick={() => setActiveTab("hourly_max")}>Hourly Max</Tab>
        <Tab onClick={() => setActiveTab("daily_volume")}>Daily Volume</Tab>
        <Tab onClick={() => setActiveTab("moving_avg")}>Moving Average</Tab>
      </div>
      <div className={style.tabContent}>
        {activeTab === "home" && <Home />}
        {activeTab === "daily_avg" && <DailyAverage />}
        {activeTab === "hourly_max" && <HourlyMax />}
        {activeTab === "daily_volume" && <DailyVolume />}
        {activeTab === "moving_avg" && <MovingAverage />}
      </div>
    </div>
  );
}

export default Content;
