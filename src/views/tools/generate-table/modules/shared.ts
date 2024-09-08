/**
 * get table prefix
 *
 * @author payne.zhuang [paynezhuang@gmail.com](mailto:paynezhuang@gmail.com)
 * @param tableName - table name
 * @returns prefix
 */
export function getPrefix(tableName: string) {
  const index = tableName.indexOf('_');
  if (index !== -1) {
    return tableName.substring(0, index + 1);
  }
  return '';
}
