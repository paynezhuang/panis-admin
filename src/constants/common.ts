import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  Y: 'common.yesOrNo.yes',
  N: 'common.yesOrNo.no'
};

export const yesOrNoTag: Record<CommonType.YesOrNo, NaiveUI.ThemeColor> = {
  Y: 'success',
  N: 'error'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);
