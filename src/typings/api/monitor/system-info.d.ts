declare namespace Api {
  namespace Monitor {
    /** SystemInfo */
    type SystemInfo = {
      /** Operating system information */
      operatingSystem: OperatingSystem;
      /** Central processor information */
      centralProcessor: CentralProcessor;
      /** Global memory information */
      globalMemory: GlobalMemory;
      /** JVM information */
      jvm: JVM;
      /** File stores */
      fileStores: FileStore[];
      /** Processes */
      processes: Process[];
    };

    /** Operating system information */
    type OperatingSystem = {
      /** name */
      name: string;
      /** arch */
      arch: string;
      /** System boot time */
      systemBootTime: string;
      /** System uptime */
      systemUptime: string;
      /** Operating system manufacturer */
      manufacturer: string;
    };

    /** Central processor information */
    type CentralProcessor = {
      /** Processor name */
      name: string;
      /** Processor identifier */
      identifier: string;
      /** Vendor frequency */
      vendorFreq: string;
      /** Number of physical processors */
      physicalProcessorCount: number;
      /** Number of logical processors */
      logicalProcessorCount: number;
      /** System load average */
      systemLoadAverage: number;
      /** Processor usage rate */
      userPercent: number;
      /** System usage rate */
      systemPercent: number;
      /** Idle rate */
      idlePercent: number;
    };

    /** Global memory information */
    type GlobalMemory = {
      /** Total memory */
      total: string;
      /** Used memory */
      used: string;
      /** Available memory */
      available: string;
      /** Total swap memory */
      swapTotal: string;
      /** Used swap memory */
      swapUsed: string;
      /** Free swap memory */
      swapFree: string;
      /** Memory usage rate */
      memoryUsedRate: number;
      /** Swap usage rate */
      swapUsedRate: number;
    };

    /** JVM information */
    type JVM = {
      /** JVM name */
      vmName: string;
      /** JVM uptime */
      uptime: string;
      /** JVM version */
      vmVersion: string;
      /** JVM vendor */
      vmVendor: string;
      /** JVM start time */
      startTime: string;
      /** JVM input arguments */
      inputArguments: string;
      /** Heap memory used */
      heapMemoryUsed: string;
      /** Maximum heap memory */
      heapMemoryMax: string;
      /** Heap memory usage rate */
      memoryUsageRate: number;
      /** Non-heap memory used */
      nonHeapMemoryUsed: string;
    };

    /** File store information */
    type FileStore = {
      /** File store name */
      name: string;
      /** File store type */
      type: string;
      /** Mount */
      mount: string;
      /** Total space */
      totalSpace: string;
      /** Usable space */
      usableSpace: string;
      /** Used space */
      usedSpace: string;
      /** Usage rate */
      usedPercentage: string;
    };

    /** Process information */
    type Process = {
      /** Process ID */
      processID: number;
      /** Process name */
      name: string;
      /** CPU load */
      cpuLoad: string;
    };
  }
}
