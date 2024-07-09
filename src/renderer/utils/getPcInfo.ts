import { makeAutoObservable } from 'mobx';
import { SystemInfoType } from '../../types/PcTyeps';

class SystemInfoStore {
  systemInfo: SystemInfoType = {
    cpuModel: '',
    totalMemory: 0,
    gpuModel: '',
    gpuVram: '',
    gpuUsage: 0,
    gpuMemoryFree: 0,
    gpuTemperature: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    sysUptime: '',
    fsSize: [],
    networkStats: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSystemInfo() {
    window.electron.ipcRenderer.sendMessage('get-system-info');
    window.electron.ipcRenderer.receiveSystemInfo((info: SystemInfoType) => {
      this.systemInfo = info;
      console.log('test2', info);
    });
  }
  getSystemInfo() {
    return this.systemInfo;
  }
  getFsSizeInfo() {
    return this.systemInfo.fsSize;
  }

  getNetworkStatsInfo() {
    return this.systemInfo.networkStats;
  }
}

export const systemInfoStore = new SystemInfoStore();
