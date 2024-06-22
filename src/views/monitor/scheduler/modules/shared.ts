import type { Api } from '@vitejs/plugin-vue';
import { $t } from '@/locales';
import { fetchImmediateJob, fetchPauseJob, fetchPauseJobGroup, fetchResumeJob, fetchResumeJobGroup } from '@/service/api';

export type ButtonDropdownKey = 'immediate' | 'pause' | 'pauseGroup' | 'resume' | 'resumeGroup';

// button operation config
interface OperationConfig {
  title: string;
  content: string;
  positiveText: string;
  negativeText: string;
  onPositiveClick: () => Promise<any>;
  message?: string;
}

// get operation handler
const initOperationHandler = (checkedRowData: Api.Monitor.Scheduler | null): Record<ButtonDropdownKey, OperationConfig> => {
  const checkedRowKey = checkedRowData?.id || '';
  return {
    immediate: {
      title: $t('page.monitor.scheduler.immediateJob'),
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: $t('page.monitor.scheduler.immediateJob'),
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchImmediateJob(checkedRowKey),
      message: $t('page.monitor.scheduler.immediateSuccess')
    },
    pause: {
      title: $t('page.monitor.scheduler.pauseJob'),
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: $t('page.monitor.scheduler.pauseJob'),
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchPauseJob(checkedRowKey),
      message: $t('page.monitor.scheduler.pauseSuccess')
    },
    pauseGroup: {
      title: $t('page.monitor.scheduler.pauseJobGroup'),
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: $t('page.monitor.scheduler.pauseJobGroup'),
        name: checkedRowData?.jobGroup
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchPauseJobGroup(checkedRowKey),
      message: $t('page.monitor.scheduler.pauseSuccess')
    },
    resume: {
      title: $t('page.monitor.scheduler.resumeJob'),
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: $t('page.monitor.scheduler.resumeJob'),
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchResumeJob(checkedRowKey),
      message: $t('page.monitor.scheduler.resumeSuccess')
    },
    resumeGroup: {
      title: $t('page.monitor.scheduler.resumeJobGroup'),
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: $t('page.monitor.scheduler.resumeJobGroup'),
        name: checkedRowData?.jobGroup
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchResumeJobGroup(checkedRowKey),
      message: $t('page.monitor.scheduler.resumeSuccess')
    }
  };
};

export const getOperationConfig = (key: ButtonDropdownKey, checkedRowData: Api.Monitor.Scheduler | null) => {
  return initOperationHandler(checkedRowData)[key];
};
