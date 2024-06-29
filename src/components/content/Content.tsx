import { useState } from 'react';
import style from './Content.module.scss';
import Tab from './tabs/Tab';
import Home from './tabs/home/Home';
import DailyAverage from './tabs/dailyAverage/DailyAverage';
import HourlyMax from './tabs/hourlyMax/HourlyMax';
import DailyVolume from './tabs/dailyVolume/DailyVolume';
import MovingAverage from './tabs/movingAverage/MovingAverage';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function Content() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { isLoggedIn } = useAuth();

  const handleTabClick = (tab: string) => {
    if (isLoggedIn) {
      setActiveTab(tab);
    } else {
      toast.error('You must be logged in to access this tab');
    }
  };

  return (
    <div className={style.content}>
      <div className={style.tabContainer}>
        <Tab onClick={() => setActiveTab('home')}>Home</Tab>
        {isLoggedIn && (
          <>
            <Tab onClick={() => handleTabClick('daily_avg')}>Daily Average</Tab>
            <Tab onClick={() => handleTabClick('hourly_max')}>Hourly Max</Tab>
            <Tab onClick={() => handleTabClick('daily_volume')}>Daily Volume</Tab>
            <Tab onClick={() => handleTabClick('moving_avg')}>Moving Average</Tab>
          </>
        )}
      </div>
      <div className={style.tabContent}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'daily_avg' && <DailyAverage />}
        {activeTab === 'hourly_max' && <HourlyMax />}
        {activeTab === 'daily_volume' && <DailyVolume />}
        {activeTab === 'moving_avg' && <MovingAverage />}
      </div>
    </div>
  );
}

export default Content;
