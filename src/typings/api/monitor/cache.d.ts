declare namespace Api {
  namespace Monitor {
    /** Cache Redis */
    type RedisInfo = {
      /** Redis version */
      version: string;
      /** upTime */
      uptime: string;
      /** connectedClients */
      connectedClients: number;
      /** usedMemory */
      usedMemory: string;
      /** usedMemoryPeak */
      maxMemory: string;
      /** memoryUsageRate */
      memoryUsageRate: string;
      /** menFragmentationRatio */
      memFragmentationRatio: string;
      /** totalCommandsProcessed */
      totalCommandsProcessed: number;
      /** Command Stats */
      commandStats: {
        name: string;
        value: number;
        percentage: number;
      }[];
    };
  }
}
