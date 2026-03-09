import { bench, describe } from 'vitest';

describe('FiltersPanel options inclusion check', () => {
  // Setup data simulating max 10 selected options
  const selectedValues = Array.from({ length: 10 }, (_, i) => `option-${i}`);
  const optionValues = Array.from({ length: 15 }, (_, i) => `option-${i}`); // 15 options to check against

  const selectedSet = new Set(selectedValues);

  bench('Array.includes', () => {
    for (const optionValue of optionValues) {
      // Simulate checking each option against the selected filters array
      const _checked = selectedValues.includes(optionValue);
    }
  });

  bench('Set.has', () => {
    for (const optionValue of optionValues) {
      // Simulate checking each option against the pre-computed Set
      const _checked = selectedSet.has(optionValue);
    }
  });
});
