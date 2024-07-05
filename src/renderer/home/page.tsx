import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import '../App.css';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faClockRotateLeft,
  faComputer,
  faEthernet,
  faHdd,
  faMemory,
  faMicrochip,
  faTemperature0,
  faWifi,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { systemInfoStore } from '../utils/getPcInfo';
import DateTimeDisplay from '../ui/Timebar';

interface StatProps {
  icon: IconDefinition;
  title: string;
  value: string;
  desc: string | undefined;
  color: string;
}

const INTERVAL_TIME = 5000;
const SUCCESS_THRESHOLD = 60;
const WARNING_THRESHOLD = 80;

const Stat: React.FC<StatProps> = ({ icon, title, value, desc, color }) => (
  <div className=" stat w-1/4">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon
        icon={icon}
        className={`inline-block h-8 w-8 stroke-current ${color}`}
      />
    </div>
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-desc">{desc}</div>
  </div>
);

const Home = observer(() => {
  useEffect(() => {
    systemInfoStore.setSystemInfo();
    const interval = setInterval(() => {
      systemInfoStore.setSystemInfo();
    }, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, []);

  const systemInfo = systemInfoStore.getSystemInfo();

  const getColor = (value: number) => {
    if (value < SUCCESS_THRESHOLD) {
      return 'text-success';
    } else if (value < WARNING_THRESHOLD) {
      return 'text-warning';
    } else {
      return 'text-error';
    }
  };

  const stats = [
    {
      icon: faTemperature0,
      title: '显卡温度',
      value: `${systemInfo.gpuTemperature}°`,
      desc: systemInfo.gpuModel.match(/RTX \d+/)?.[0],
      color: getColor(systemInfo.gpuTemperature),
    },
    {
      icon: faComputer,
      title: '显卡利用率',
      value: `${Math.round(systemInfo.gpuUsage)}%`,
      desc: systemInfo.gpuModel.match(/RTX \d+/)?.[0],
      color: getColor(systemInfo.gpuUsage),
    },
    {
      icon: faMicrochip,
      title: 'CPU利用率',
      value: `${Math.round(systemInfo.cpuUsage)}%`,
      desc: systemInfo.cpuModel.split(' ').pop(),
      color: getColor(systemInfo.cpuUsage),
    },
    {
      icon: faMemory,
      title: '内存利用率',
      value: `${Math.round(systemInfo.memoryUsage)}%`,
      desc: `${Math.round(systemInfo.totalMemory / 1024 / 1024 / 1024)}GB`,
      color: getColor(systemInfo.memoryUsage),
    },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <DateTimeDisplay />
      <div className="stats shadow flex">
        {stats.map((stat, index) => (
          <Stat key={index} {...stat} />
        ))}
      </div>
      {/* ...rest of the component */}
    </div>
  );
});

export default Home;
