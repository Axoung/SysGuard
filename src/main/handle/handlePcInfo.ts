import { ipcMain } from 'electron';
import os from 'os';
import si from 'systeminformation';
import { exec } from 'child_process';
import * as nodeDiskInfo from 'node-disk-info';
export default function handleComputer() {
  ipcMain.on('get-system-info', async (event) => {
    try {
      const cpuModel = os.cpus()[0].model;
      const totalMemory = os.totalmem();
      const graphicsInfo = await getGpuInfo();
      const { memoryFree, name, memoryTotal, gpuUtilization, temperature } =
        graphicsInfo;
      const cpuUsage = await si.currentLoad();
      const memoryUsage = await si.mem();
      const sysUptime = await si.time().uptime;
      const fsSize = await si.fsSize();
      const networkStats = await si.networkStats();

      event.reply('system-info', {
        cpuModel, // CPU 名称
        totalMemory, // 总内存
        gpuModel: `${name}`, // GPU 名称
        gpuVram: `${memoryTotal} Mb`, // GPU 显存
        gpuUsage: gpuUtilization, // GPU 利用率
        gpuMemoryFree: memoryFree, // GPU 内存空闲
        gpuTemperature: temperature, // GPU 温度
        cpuUsage: cpuUsage.currentLoad, // CPU 利用率
        memoryUsage: (memoryUsage.used / memoryUsage.total) * 100, // 内存利用率
        sysUptime: sysUptime, // 系统运行时间
        fsSize: fsSize, // 硬盘信息
        networkStats: networkStats, // 网络信息
      });
    } catch (error) {
      console.error('Error getting system info:', error);
    }
  });
}

async function getNvidiaGpuDetails(gpuId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(
      `nvidia-smi --query-gpu=index,name,temperature.gpu,utilization.gpu,memory.total,memory.free,utilization.memory --format=csv,noheader,nounits `,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        const [
          id,
          name,
          temperature,
          gpuUtilization,
          memoryTotal,
          memoryFree,
          memoryUtilization,
        ] = stdout.trim().split(', ');
        resolve({
          id,
          name,
          temperature,
          gpuUtilization,
          memoryTotal,
          memoryFree,
          memoryUtilization,
        });
      },
    );
  });
}

async function getAmdGpuDetails(gpuId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(`rocm-smi --id=${gpuId}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
    });
  });
}

async function getIntegratedGpuDetails(gpuId: string): Promise<any> {
  // Use appropriate methods to get integrated GPU details
}

async function getGpuInfo() {
  const graphicsInfo = await si.graphics();
  let integratedGpu = null;
  let dedicatedGpu = null;

  for (const controller of graphicsInfo.controllers) {
    if (
      controller.vendor.toLowerCase().includes('intel') ||
      (controller.vendor.toLowerCase().includes('amd') &&
        controller.model.toLowerCase().includes('apu'))
    ) {
      integratedGpu = controller;
    } else if (
      controller.vendor.toLowerCase().includes('nvidia') ||
      controller.vendor.toLowerCase().includes('amd')
    ) {
      dedicatedGpu = controller;
    }
  }

  if (dedicatedGpu) {
    let gpuDetails;
    if (dedicatedGpu.vendor.toLowerCase().includes('nvidia')) {
      gpuDetails = await getNvidiaGpuDetails(dedicatedGpu.vendor);
    } else if (dedicatedGpu.vendor.toLowerCase().includes('amd')) {
      gpuDetails = await getAmdGpuDetails(dedicatedGpu.bus);
    }
    const {
      id,
      name,
      temperature,
      gpuUtilization,
      memoryTotal,
      memoryFree,
      memoryUtilization,
    } = gpuDetails;

    return {
      type: 'Dedicated GPU',
      id,
      name,
      temperature,
      gpuUtilization,
      memoryTotal,
      memoryFree,
      memoryUtilization,
    };
  } else if (integratedGpu) {
    const gpuDetails = await getIntegratedGpuDetails(integratedGpu.bus);
    const {
      id,
      name,
      temperature,
      gpuUtilization,
      memoryTotal,
      memoryFree,
      memoryUtilization,
    } = gpuDetails;

    return {
      type: 'Integrated GPU',
      id,
      name,
      temperature,
      gpuUtilization,
      memoryTotal,
      memoryFree,
      memoryUtilization,
    };
  } else {
    return {
      type: 'No GPU information available',
    };
  }
}
