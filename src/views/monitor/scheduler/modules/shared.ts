import { type VNode } from 'vue';
import { $t } from '@/locales';
import { fetchImmediateJob, fetchPauseJob, fetchPauseJobGroup, fetchResumeJob, fetchResumeJobGroup } from '@/service/api';

export type OperationTypes = 'immediate' | 'pause' | 'pauseGroup' | 'resume' | 'resumeGroup';

export interface OperateButton {
  type: OperationTypes;
  auth: string;
  title: string;
  icon: () => VNode;
}

// button operation config
interface OperationConfig {
  title: string;
  icon: () => VNode;
  content: string;
  positiveText: string;
  negativeText: string;
  onPositiveClick: () => Promise<any>;
  message?: string;
}

// get operation handler
const initOperationHandler = (button: OperateButton, checkedRowData: Api.Monitor.Scheduler | null): Record<OperationTypes, OperationConfig> => {
  const checkedRowKey = checkedRowData?.id || '';
  return {
    immediate: {
      title: button.title,
      icon: button.icon,
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: button.title,
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchImmediateJob(checkedRowKey),
      message: $t('page.monitor.scheduler.immediateSuccess')
    },
    pause: {
      title: button.title,
      icon: button.icon,
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: button.title,
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchPauseJob(checkedRowKey),
      message: $t('page.monitor.scheduler.pauseSuccess')
    },
    pauseGroup: {
      title: button.title,
      icon: button.icon,
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: button.title,
        name: checkedRowData?.jobGroup
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchPauseJobGroup(checkedRowKey),
      message: $t('page.monitor.scheduler.pauseSuccess')
    },
    resume: {
      title: button.title,
      icon: button.icon,
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: button.title,
        name: checkedRowData?.jobName
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchResumeJob(checkedRowKey),
      message: $t('page.monitor.scheduler.resumeSuccess')
    },
    resumeGroup: {
      title: button.title,
      icon: button.icon,
      content: $t('page.monitor.scheduler.confirmOperate', {
        operation: button.title,
        name: checkedRowData?.jobGroup
      }),
      positiveText: $t('common.confirm'),
      negativeText: $t('common.cancel'),
      onPositiveClick: () => fetchResumeJobGroup(checkedRowKey),
      message: $t('page.monitor.scheduler.resumeSuccess')
    }
  };
};

export const getOperationConfig = (button: OperateButton, checkedRowData: Api.Monitor.Scheduler | null) => {
  return initOperationHandler(button, checkedRowData)[button.type];
};
