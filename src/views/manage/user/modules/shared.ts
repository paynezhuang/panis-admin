export type OperateType = NaiveUI.TableOperateType | 'addChild';

/**
 * transform orgUnitsTree to NaiveUI.TreeOption
 *
 * @file src/views/manage/user/modules/shared.ts
 * @param orgUnitsTree
 * @param orgUnitsIds
 */
export function extractOptionsFromTree(orgUnitsTree: Api.SystemManage.OrgUnitsTree[], orgUnitsIds: string[]): CommonType.Option[] {
  const principalOptions: CommonType.Option[] = [];

  function traverse(node: Api.SystemManage.OrgUnitsTree) {
    if (orgUnitsIds.includes(node.id)) {
      principalOptions.push({ value: node.id, label: node.name });
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  orgUnitsTree.forEach(traverse);

  return principalOptions;
}

/**
 * collect ids from item
 *
 * @param item orgUnitsTree
 * @returns ids
 */
export function collectIdsFromItem(item: Api.SystemManage.OrgUnitsTree): string {
  const idsSet: Set<string> = new Set();

  function traverse(node: Api.SystemManage.OrgUnitsTree) {
    idsSet.add(node.id);
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(item);

  return Array.from(idsSet).join(',');
}
