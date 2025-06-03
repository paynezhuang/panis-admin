import { computed, h } from 'vue';
import { NButton, NDropdown } from 'naive-ui';
import { $t } from '@/locales';

/** DataTable operation button dropdown */
export function useButtonAuthDropdown<T extends string | number, S>(options: CommonType.ButtonDropdown<T, S>[]) {
  // Convert ButtonDropdown options to NDropdown options
  const dropdownOptions = computed<NaiveUI.DropdownOption[]>(() =>
    options
      .filter(opt => opt.show)
      .map(opt => ({
        key: opt.key,
        label: opt.label,
        icon: opt.icon
      }))
  );

  /** Handle dropdown select */
  const handleSelect = (key: T, row: S) => {
    const option = options.find(opt => opt.key === key && 'handler' in opt);
    option?.handler(key, row);
  };

  /** Render dropdown */
  const renderDropdown = (row: S) => {
    return h(
      NDropdown,
      {
        trigger: 'hover',
        options: dropdownOptions.value,
        size: 'small',
        showArrow: true,
        onSelect: (key: T) => handleSelect(key, row)
      },
      {
        default: () => h(NButton, { quaternary: true, type: 'primary' }, { default: () => $t('common.moreOperation') })
      }
    );
  };
  return { renderDropdown };
}
