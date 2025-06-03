import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchGetAllDictItemMap } from '@/service/api';
import { SetupStoreId } from '@/enum';

export const useDictStore = defineStore(SetupStoreId.Dict, () => {
  const dictItemMap = ref<Map<string, Api.SystemManage.DictOptions[]>>();

  /** Initialize dictionary data */
  async function init() {
    // Fetch data from API
    const { error, data } = await fetchGetAllDictItemMap();
    if (!error) {
      // Convert the fetched data to a Map and assign it to dictItemMap
      dictItemMap.value = new Map(Object.entries(data));
    }
  }

  /**
   * Get dictionary item type map by dictionary code
   *
   * @param code Dictionary code
   * @returns Dictionary item type map
   */
  function type(code: string): Map<string, NaiveUI.ThemeColor> {
    return options(code).reduce((acc, item) => acc.set(item.value, item.type), new Map<string, NaiveUI.ThemeColor>());
  }

  /**
   * Get dictionary item label map by dictionary code
   *
   * @param code Dictionary code
   * @returns Dictionary item label map
   */
  function map(code: string): Map<string, string> {
    return options(code).reduce((acc, item) => acc.set(item.value, item.label), new Map<string, string>());
  }

  /**
   * Get dictionary item array by dictionary code
   *
   * @param code Dictionary code
   * @returns Dictionary item array
   */
  function options(code: string): Api.SystemManage.DictOptions[] | [] {
    return dictItemMap.value?.get(code) || [];
  }

  return {
    init,
    type,
    map,
    options
  };
});
