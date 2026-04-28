import { Filter } from '@/types/filters.types';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import { CheckboxSize } from '@/types/form.types';
import { OnFilterChange } from '@/types/filters.types';

export default function CheckboxFilter({
  name,
  size,
  filter,
  selectedValues,
  onFilterChange,
}: {
  name: string;
  size?: CheckboxSize;
  filter: Filter;
  selectedValues: string[];
  onFilterChange: OnFilterChange;
}) {
  return (
    <>
      {filter.options.map((option) => (
        <Checkbox
          key={option.id}
          name={name}
          value={option.id}
          checked={selectedValues.includes(option.name.toLowerCase())}
          onChange={(e) =>
            onFilterChange(name, option.name.toLowerCase(), e.target.checked)
          }
          size={size}
        >
          {option.name}
        </Checkbox>
      ))}
    </>
  );
}
