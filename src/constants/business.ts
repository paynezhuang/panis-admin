import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '0': 'page.manage.common.status.disable'
};

export const enableStatusTag: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
  0: 'error',
  1: 'success'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

/** user gender */
export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  '0': 'page.manage.user.userGender.confidential',
  '1': 'page.manage.user.userGender.male',
  '2': 'page.manage.user.userGender.female'
};

export const userGenderTag: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
  0: 'warning',
  1: 'primary',
  2: 'error'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

/** menu type */
export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.menuType.directory',
  '2': 'page.manage.menu.menuType.menu'
};

export const menuTypeTag: Record<Api.SystemManage.MenuType, NaiveUI.ThemeColor> = {
  1: 'default',
  2: 'primary'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

/** menu icon type */
export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.iconType.iconify',
  '2': 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);

/** monitor logs login status */
export const logsLoginStatusRecord: Record<Api.Monitor.LogsLoginStatus, App.I18n.I18nKey> = {
  '0': 'page.monitor.logs.login.loginStatus.fail',
  '1': 'page.monitor.logs.login.loginStatus.success'
};

export const logsLoginStatusTag: Record<Api.Monitor.LogsLoginStatus, NaiveUI.ThemeColor> = {
  0: 'error',
  1: 'success'
};

export const logsLoginStatusOptions = transformRecordToOption(logsLoginStatusRecord);

/** monitor logs scheduler status */
export const logsSchedulerStatusRecord: Record<Api.Monitor.SchedulerExecuteStatus, App.I18n.I18nKey> = {
  FAIL: 'page.monitor.logs.scheduler.executeStatus.fail',
  SUCCESS: 'page.monitor.logs.scheduler.executeStatus.success'
};

export const logsSchedulerStatusTag: Record<Api.Monitor.SchedulerExecuteStatus, NaiveUI.ThemeColor> = {
  FAIL: 'error',
  SUCCESS: 'success'
};

export const logsSchedulerStatusOptions = transformRecordToOption(logsSchedulerStatusRecord);

/** monitor scheduler trigger state */
export const schedulerTriggerStateRecord: Record<Api.Monitor.SchedulerTriggerState, App.I18n.I18nKey> = {
  WAITING: 'page.monitor.scheduler.triggerStates.waiting',
  ACQUIRED: 'page.monitor.scheduler.triggerStates.acquired',
  EXECUTING: 'page.monitor.scheduler.triggerStates.executing',
  PAUSED: 'page.monitor.scheduler.triggerStates.paused',
  BLOCKED: 'page.monitor.scheduler.triggerStates.blocked',
  ERROR: 'page.monitor.scheduler.triggerStates.error'
};

export const schedulerTriggerStateTag: Record<Api.Monitor.SchedulerTriggerState, NaiveUI.ThemeColor> = {
  WAITING: 'success',
  ACQUIRED: 'success',
  EXECUTING: 'success',
  PAUSED: 'error',
  BLOCKED: 'error',
  ERROR: 'error'
};

export const schedulerTriggerStateOptions = transformRecordToOption(schedulerTriggerStateRecord);

/** dict type */
export const dictTypeRecord: Record<Api.SystemManage.DictType, App.I18n.I18nKey> = {
  '1': 'page.manage.dict.dictType.system',
  '2': 'page.manage.dict.dictType.business'
};

export const dictTypeOptions = transformRecordToOption(dictTypeRecord);
