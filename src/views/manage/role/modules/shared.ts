/** recursive org units tree data, add prefix transform treeOption format */
export function recursive(item: Api.SystemManage.OrgUnitsTree): NaiveUI.TreeOption {
  const result: NaiveUI.TreeOption = {
    key: item.id,
    label: item.name
  };
  if (item.children) {
    result.children = item.children.map(recursive);
  }
  return result;
}
