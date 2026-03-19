import type { UiSelectOptionRecord } from './form-types';
export type { UiSelectOptionRecord } from './form-types';

export function normalizeSelectOptions(options: UiSelectOptionRecord[]): Array<UiSelectOptionRecord & { disabled: boolean }> {
  return options.map((option) => ({
    ...option,
    disabled: option.disabled ?? false,
  }));
}
