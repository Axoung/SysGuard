export type SystemInfoType = {
  cpuModel: string;
  totalMemory: number;
  gpuModel: string;
  gpuVram: string;
  gpuUsage: number;
  gpuMemoryFree: number;
  gpuTemperature: number;
  cpuUsage: number;
  memoryUsage: number;
  sysUptime: string; // 系统运行时间
  fsSize: DiskInfoType[]; // 硬盘信息
  networkStats: NetworkStatsType[]; // 网络信息
};

export type NetworkStatsType = {
  iface: string; // 网络接口的名称
  operstate: string; // 网络接口的操作状态
  rx_bytes: number; // 接收到的字节数
  rx_dropped: number; // 接收时丢弃的数据包数量
  rx_errors: number; // 接收时发生错误的数据包数量
  tx_bytes: number; // 发送的字节数
  tx_dropped: number; // 发送时丢弃的数据包数量
  tx_errors: number; // 发送时发生错误的数据包数量
  rx_sec: number; // 每秒接收的字节数
  tx_sec: number; // 每秒发送的字节数
  ms: number; // 延迟（毫秒）
};

export type DiskInfoType = {
  fs: string; // 文件系统的名称
  type: string; // 文件系统的类型
  size: number; // 文件系统的总大小，单位是字节
  used: number; // 已使用的空间大小，单位是字节
  available: number; // 可用的空间大小，单位是字节
  use: number; // 使用率，单位是百分比
  mount: string; // 文件系统的挂载点
  rw: boolean; // 是否可读写
};
