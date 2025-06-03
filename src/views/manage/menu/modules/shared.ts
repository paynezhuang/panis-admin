import { useDict } from '@/hooks/business/dict';

const LAYOUT_PREFIX = 'layout.';
const VIEW_PREFIX = 'view.';
const FIRST_LEVEL_ROUTE_COMPONENT_SPLIT = '#';

const { dictOptions } = useDict();

export function getLayoutAndPage(component?: string | null) {
  let layout = '';
  let page = '';

  const [layoutOrPage, pageItem] = component?.split(FIRST_LEVEL_ROUTE_COMPONENT_SPLIT) || [];

  layout = getLayout(layoutOrPage);
  page = getPage(pageItem || layoutOrPage);

  return { layout, page };
}

function getLayout(layout: string) {
  return layout.startsWith(LAYOUT_PREFIX) ? layout.replace(LAYOUT_PREFIX, '') : '';
}

function getPage(page: string) {
  return page.startsWith(VIEW_PREFIX) ? page.replace(VIEW_PREFIX, '') : '';
}

export function transformLayoutAndPageToComponent(layout: string, page: string) {
  const hasLayout = Boolean(layout);
  const hasPage = Boolean(page);

  if (hasLayout && hasPage) {
    return `${LAYOUT_PREFIX}${layout}${FIRST_LEVEL_ROUTE_COMPONENT_SPLIT}${VIEW_PREFIX}${page}`;
  }

  if (hasLayout) {
    return `${LAYOUT_PREFIX}${layout}`;
  }

  if (hasPage) {
    return `${VIEW_PREFIX}${page}`;
  }

  return '';
}

/**
 * Get route name by route path
 *
 * @param routeName
 */
export function getRoutePathByRouteName(routeName: string) {
  return `/${routeName.replace(/_/g, '/')}`;
}

/**
 * Get path param from route path
 *
 * @param routePath route path
 */
export function getPathParamFromRoutePath(routePath: string) {
  const [path, param = ''] = routePath.split('/:');

  return {
    path,
    param
  };
}

/**
 * Get route path with param
 *
 * @param routePath route path
 * @param param path param
 */
export function getRoutePathWithParam(routePath: string, param: string) {
  if (param.trim()) {
    return `${routePath}/:${param}`;
  }

  return routePath;
}

/**
 * Get permission scope type name
 *
 * @param scopeType scope type
 */
export function getPermissionScopeTypeName(scopeType: string) {
  return dictOptions('data_scope_type').find(item => item.value === scopeType)?.label || '';
}

/**
 * Get resource with permission source, default to the first
 *
 * @param permission permission
 */
export function getResourceWithPermission(permission: string) {
  const [first] = permission?.split(';') || [];
  return first || '';
}

/**
 * Transform items to select options format
 *
 * @param items items to transform
 */
export function transformToSelectOptions(items: Array<{ code: string; name: string }>) {
  return items.map(item => ({
    label: item.name,
    value: item.code
  }));
}

/**
 * Get all unique operators from conditions
 *
 * @param conditions conditions array
 */
export function getAllUniqueOperators(conditions: Api.SystemManage.OperatorCondition[]) {
  const operators = conditions.map(condition => ({
    code: condition.code,
    name: condition.description
  }));
  return transformToSelectOptions(operators);
}

/**
 * Get operators for a specific variable
 *
 * @param variables variables array
 * @param conditions conditions array
 * @param variableCode variable code
 */
export function getOperatorsForVariable(
  variables: Api.SystemManage.VariableCondition[],
  conditions: Api.SystemManage.OperatorCondition[],
  variableCode: string | null
) {
  if (!variableCode) return getAllUniqueOperators(conditions);

  const variable = variables.find(v => v.code === variableCode);
  if (!variable) return [];

  // 根据变量的 conditions 数组过滤出对应的操作符
  const operators = conditions
    .filter(condition => variable.conditions.includes(condition.code))
    .map(condition => ({
      code: condition.code,
      name: condition.description
    }));
  return transformToSelectOptions(operators);
}
