'use client';

import { useTranslations } from 'next-intl';
import useSort from '@/hooks/useSort';
import SelectOption from '@/components/ui/form/fields/select/SelectOption';
import { SelectVariant } from '@/types/form.types';
import SortIcon from '@mui/icons-material/Sort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
  name,
  variant = 'labeled',
  openDirection = 'bottom',
  options,
  selectedOption,
  setSelectedOption,
  onUserChange,
  className,
}: {
  name: string;
  variant?: SelectVariant;
  openDirection?: 'top' | 'bottom';
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  onUserChange?: () => void;
  className?: string;
}) {
  const t = useTranslations('Sort');
  const { handleChange } = useSort(
    selectedOption,
    setSelectedOption,
    onUserChange,
  );

  return (
    <Select
      variant={variant}
      name={`sort-${name}`}
      translatedName={t(`${name}.button`)}
      label={t(`${name}.label`)}
      selected={t(`${name}.options.${selectedOption}`)}
      openDirection={openDirection}
      Icon={SortIcon}
      onChange={handleChange}
      className={className}
    >
      {options.map((option) => (
        <SelectOption
          key={option}
          value={option}
          isSelected={option === selectedOption}
        >
          {t(`${name}.options.${option}`)}
        </SelectOption>
      ))}
    </Select>
  );
}
