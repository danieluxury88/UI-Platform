import { normalizeSelectOptions } from './form-utils';

describe('form-utils', () => {
  it('normalizes select options and defaults disabled to false', () => {
    const options = normalizeSelectOptions([
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two', disabled: true },
    ]);

    expect(options[0]?.disabled).toBe(false);
    expect(options[1]?.disabled).toBe(true);
  });
});
