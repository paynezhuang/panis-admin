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
