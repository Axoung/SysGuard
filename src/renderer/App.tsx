import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import '../locales/i18n';
import Test from './docker/page';
import Sidebar from './ui/Sidebar';
import { useTranslation } from 'react-i18next';

import DockerPage from './docker/page';
import { useEffect, useState } from 'react';
import { systemInfoStore } from './utils/getPcInfo';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faBoltLightning,
  faClock,
  faClockRotateLeft,
  faComputer,
  faEthernet,
  faHdd,
  faMemory,
  faMicrochip,
  faTemperature0,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { themeChange } from 'theme-change';
import DateTimeDisplay from './ui/Timebar';
// import Home from './home/page';

const Home = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    systemInfoStore.setSystemInfo();
    const interval = setInterval(() => {
      systemInfoStore.setSystemInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const systemInfo = systemInfoStore.getSystemInfo();

  return (
    <div className="flex flex-col space-y-2">
      <h1>{t('greeting', { name: 'John' })}</h1>
      <DateTimeDisplay />
      <div className="stats shadow flex">
        <div className=" stat w-1/4">
          <div className="stat-figure text-secondary">
            <FontAwesomeIcon
              icon={faTemperature0}
              className={`inline-block h-8 w-8 stroke-current ${
                systemInfo.gpuTemperature < 60
                  ? 'text-success'
                  : systemInfo.gpuTemperature < 80
                  ? 'text-warning'
                  : 'text-error'
              }`}
            />
          </div>
          <div className="stat-title">显卡温度</div>
          <div className="stat-value">{systemInfo.gpuTemperature}°</div>
          <div className="stat-desc">
            <div className="stat-desc">
              <div className="stat-desc">
                {systemInfo.gpuModel.match(/RTX \d+/)?.[0]}
              </div>
            </div>
          </div>
        </div>

        <div className=" stat w-1/4">
          <div className="stat-figure text-secondary">
            <FontAwesomeIcon
              icon={faComputer}
              className={`inline-block h-8 w-8 stroke-current ${
                systemInfo.gpuUsage < 60
                  ? 'text-success'
                  : systemInfo.gpuUsage < 80
                  ? 'text-warning'
                  : 'text-error'
              }`}
            />
          </div>
          <div className="stat-title">显卡利用率</div>
          <div className="stat-value">{Math.round(systemInfo.gpuUsage)}%</div>
          <div className="stat-desc">
            {systemInfo.gpuModel.match(/RTX \d+/)?.[0]}
          </div>
        </div>

        <div className=" stat w-1/4">
          <div className="stat-figure text-secondary">
            <FontAwesomeIcon
              icon={faMicrochip}
              className={`inline-block h-8 w-8 stroke-current ${
                systemInfo.cpuUsage < 60
                  ? 'text-success'
                  : systemInfo.cpuUsage < 80
                  ? 'text-warning'
                  : 'text-error'
              }`}
            />
          </div>
          <div className="stat-title">CPU利用率</div>
          <div className="stat-value">{Math.round(systemInfo.cpuUsage)}%</div>
          <div className="stat-desc">
            {systemInfo.cpuModel.split(' ').pop()}
          </div>
        </div>
        <div className=" stat w-1/4">
          <div className="stat-figure text-secondary">
            <FontAwesomeIcon
              icon={faMemory}
              className={`inline-block h-8 w-8 stroke-current ${
                systemInfo.memoryUsage < 60
                  ? 'text-success'
                  : systemInfo.memoryUsage < 80
                  ? 'text-warning'
                  : 'text-error'
              }`}
            />
          </div>
          <div className="stat-title">内存利用率</div>
          <div className="stat-value">
            {Math.round(systemInfo.memoryUsage)}%
          </div>
          <div className="stat-desc">
            {Math.round(systemInfo.totalMemory / 1024 / 1024 / 1024)}GB
          </div>
        </div>
      </div>
      {systemInfo.networkStats.map((network, index) => (
        <div key={index} className="stats shadow flex">
          <div className=" stat w-1/4">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon
                icon={network.iface === 'WLAN' ? faWifi : faEthernet}
                className={`inline-block h-8 w-8 stroke-current ${
                  network.operstate === 'up' ? 'text-success' : 'text-error'
                }`}
              />
            </div>
            <div className="stat-title">网卡名称</div>
            <div className="stat-value">{network.iface}</div>
            <div className="stat-desc">状态:{network.operstate}</div>
          </div>
          <div className=" stat w-1/4">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className={`inline-block h-8 w-8 stroke-current ${
                  network.ms > 100
                    ? 'text-error'
                    : network.ms > 50
                    ? 'text-warning'
                    : 'text-success'
                }`}
              />
            </div>
            <div className="stat-title">延迟</div>
            <div className="stat-value">{network.ms}</div>
            <div className="stat-desc">ms</div>
          </div>
          <div className=" stat w-1/4">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon
                icon={faBolt}
                className="inline-block h-8 w-8 stroke-current text-yellow-300"
              />
            </div>
            <div className="stat-title">下行速度</div>
            <div className="stat-value">
              {network.rx_sec < 1024 * 1024
                ? (network.rx_sec / 1024).toFixed(2)
                : network.rx_sec < 1024 * 1024 * 1024
                ? (network.rx_sec / 1024 / 1024).toFixed(2)
                : (network.rx_sec / 1024 / 1024 / 1024).toFixed(2)}
            </div>
            <div className="stat-desc">
              {network.rx_sec < 1024 * 1024
                ? 'Kb'
                : network.rx_sec < 1024 * 1024 * 1024
                ? 'Mb'
                : 'Gb'}
              / s
            </div>
          </div>

          <div className=" stat w-1/4">
            <div className="stat-title">上行速度</div>
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon
                icon={faBolt}
                className="inline-block h-8 w-8 stroke-current text-yellow-300"
              />
            </div>
            <div className="stat-value">
              {network.rx_sec < 1024 * 1024
                ? (network.rx_sec / 1024).toFixed(2)
                : network.rx_sec < 1024 * 1024 * 1024
                ? (network.rx_sec / 1024 / 1024).toFixed(2)
                : (network.rx_sec / 1024 / 1024 / 1024).toFixed(2)}
            </div>
            <div className="stat-desc">
              {network.rx_sec < 1024 * 1024
                ? 'Kb'
                : network.rx_sec < 1024 * 1024 * 1024
                ? 'Mb'
                : 'Gb'}{' '}
              / s
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap">
        {systemInfo.fsSize.map((disk, index) => (
          <div
            key={index}
            className="stat shadow rounded-2xl w-full md:w-1/2 md:flex-grow"
          >
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon
                icon={faHdd}
                className="inline-block h-8 w-8 stroke-current"
              />
            </div>
            <div className="stat-title">{disk.fs} 盘使用率</div>
            <div className="stat-value flex items-center">
              {Math.round((disk.used / disk.size) * 100)}%
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary rounded-full items-center justify-center"
                  style={{
                    width: `${Math.round((disk.used / disk.size) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="stat-desc">
              {Math.round(disk.available / 1024 / 1024 / 1024)}GB 可用
            </div>
          </div>
        ))}
      </div>
      {/* <button
        className="btn btn-primary"
        onClick={async () => {
          console.log('test2', systemInfo, systemInfoStore.getSystemInfo());
        }}
      >
        test
      </button> */}
      <label htmlFor="themeSelect" className=" label">
        选择主题
      </label>
      <select id="themeSelect" data-choose-theme className=" select ">
        <option value="">Default</option>
        <option value="dark">Dark</option>
        <option value="light">light</option>
        <option value="cupcake">cupcake</option>
        <option value="docker">docker</option>
      </select>
    </div>
  );
});

export default function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <Router>
      <div className="flex w-screen h-screen">
        <div className="border-r ">
          <Sidebar />
        </div>
        <div className="flex-grow mx-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docker" element={<DockerPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
