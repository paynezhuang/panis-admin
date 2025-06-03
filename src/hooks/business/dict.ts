import type { VNode } from 'vue';
import { h } from 'vue';
import { NTag, NText } from 'naive-ui';
import { useDictStore } from '@/store/modules/dict';

export function useDict() {
  const dictStore = useDictStore();

  /**
   * Get dictionary options by dictionary code
   *
   * @param code Dictionary code
   * @returns Dictionary options array
   */
  function dictOptions(code: string): Api.SystemManage.DictOptions[] | [] {
    return dictStore.options(code);
  }

  /**
   * Get the dictionary item type by dictionary code and value
   *
   * @param code Dictionary code
   * @param value Dictionary item value
   * @returns The theme color associated with the dictionary item type
   */
  function dcitType(code: string, value: string): NaiveUI.ThemeColor {
    return dictStore.type(code).get(value) || 'default';
  }

  /**
   * Get dictionary label by dictionary code and value
   *
   * @param code Dictionary code
   * @param value Dictionary item value
   * @returns Dictionary item label
   */
  function dictLabel(code: string, value: string): string {
    return dictStore.map(code).get(value) || '';
  }

  /**
   * Get dictionary text node by dictionary code and value
   *
   * @param code Dictionary code
   * @param value Dictionary item value
   * @returns VNode representing the dictionary text
   */
  function dictText(code: string, value: string | null): VNode | null {
    if (value === null) return null;
    const type = dcitType(code, value);
    return h(NText, { type }, () => dictLabel(code, value));
  }

  /**
   * Get dictionary tag node by dictionary code and value
   *
   * @param code Dictionary code
   * @param value Dictionary item value
   * @returns VNode representing the dictionary tag
   */
  function dictTag(code: string, value: string | null): VNode | null {
    if (value === null) return null;
    const type = dcitType(code, value);
    return h(NTag, { type, bordered: false }, () => dictLabel(code, value));
  }

  return {
    dictLabel,
    dcitType,
    dictText,
    dictTag,
    dictOptions
  };
}
