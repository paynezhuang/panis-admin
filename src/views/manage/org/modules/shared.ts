export function getLevelAndAncestors(params: Api.SystemManage.OrgUnits) {
  const level = params.level + 1;
  const ancestors = `${params.ancestors},${params.id}`;

  return { level, ancestors };
}
