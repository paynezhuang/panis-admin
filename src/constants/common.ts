import { transformRecordToOption } from '@/utils/common';

const themeColorRecord: Record<NaiveUI.ThemeColor, string> = {
  default: 'Default',
  error: 'Error',
  primary: 'Primary',
  info: 'Info',
  success: 'Success',
  warning: 'Warning'
};

export const themeColorOptions = transformRecordToOption(themeColorRecord);
