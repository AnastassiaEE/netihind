import useCheckboxFilter from '@/hooks/useCheckboxFilter';
import { Filter, Filters } from '@/types/filters.types';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import { CheckboxSize } from '@/types/form.types';

export default function CheckboxFilter({
  name,
  size,
  filter,
  setFilters,
  onUserChange,
}: {
  name: string;
  size?: CheckboxSize;
  filter: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onUserChange?: () => void;
}) {
  const { handleChange } = useCheckboxFilter(name, setFilters, onUserChange);

  return (
    <>
      {filter.options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          value={option.value}
          checked={filter.selected.some(
            (opt) => opt.value.toString() === option.value.toString(),
          )}
          onChange={(e) => handleChange(option.value, e.target.checked)}
          size={size}
        >
          {option.label}
        </Checkbox>
      ))}
    </>
  );
}
