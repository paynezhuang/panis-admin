import { $t } from '@/locales';
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

/** generate code render type */
type RenderType = 'input' | 'select' | 'radio';

const renderTypeRecord: Record<RenderType, string> = {
  input: $t('page.tools.common.renderType.input'),
  select: $t('page.tools.common.renderType.select'),
  radio: $t('page.tools.common.renderType.radio')
};

export const renderTypeOptions = transformRecordToOption(renderTypeRecord);

/** generate code search type */
type SearchType =
  | 'equal'
  | 'noEqual'
  | 'like'
  | 'leftLike'
  | 'rightLike'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'in'
  | 'notIn'
  | 'between'
  | 'notBetween';

const searchTypeRecord: Record<SearchType, string> = {
  equal: $t('page.tools.common.searchType.equal'),
  noEqual: $t('page.tools.common.searchType.noEqual'),
  like: $t('page.tools.common.searchType.like'),
  leftLike: $t('page.tools.common.searchType.leftLike'),
  rightLike: $t('page.tools.common.searchType.rightLike'),
  greaterThan: $t('page.tools.common.searchType.greaterThan'),
  greaterThanOrEqual: $t('page.tools.common.searchType.greaterThanOrEqual'),
  lessThan: $t('page.tools.common.searchType.lessThan'),
  lessThanOrEqual: $t('page.tools.common.searchType.lessThanOrEqual'),
  in: $t('page.tools.common.searchType.in'),
  notIn: $t('page.tools.common.searchType.notIn'),
  between: $t('page.tools.common.searchType.between'),
  notBetween: $t('page.tools.common.searchType.notBetween')
};

export const searchTypeOptions = transformRecordToOption(searchTypeRecord);
