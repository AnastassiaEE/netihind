'use client';

import { useTranslations } from 'next-intl';
import SelectOption from '@/components/ui/form/fields/select/SelectOption';
import { SelectVariant } from '@/types/form.types';
import SortIcon from '@mui/icons-material/Sort';
import Select from '@/components/ui/form/fields/select/Select';
import { translateKey } from '@/utils/translationHelper';

export default function Sort({
  name,
  variant = 'labeled',
  openDirection = 'bottom',
  options,
  selectedBySort,
  onSortChange,
  className,
}: {
  name: string;
  variant?: SelectVariant;
  openDirection?: 'top' | 'bottom';
  options: string[];
  selectedBySort: string;
  onSortChange: (option: string) => void;
  className?: string;
}) {
  const t = useTranslations('Sort');

  return (
    <Select
      variant={variant}
      name={`sort-${name}`}
      buttonLabel={translateKey(t, `${name}.buttonLabel`)}
      label={translateKey(t, `${name}.ariaLabel`)}
      selected={translateKey(t, `${name}.options.${selectedBySort}`)}
      openDirection={openDirection}
      Icon={SortIcon}
      onChange={(name, value) => onSortChange(value)}
      className={className}
    >
      {options.map((option) => (
        <SelectOption
          key={option}
          value={option}
          isSelected={option === selectedBySort}
        >
          {translateKey(t, `${name}.options.${option}`)}
        </SelectOption>
      ))}
    </Select>
  );
}
