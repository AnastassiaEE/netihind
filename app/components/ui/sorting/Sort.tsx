'use client';

import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';
import SelectOption from '@/components/ui/form/fields/select/SelectOption';
import { SelectVariant } from '@/types/formElemets';
import PlainSelect from '../form/fields/select/PlainSelect';

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
    <>
      {variant === 'plain' && (
        <PlainSelect
          name={`sort-${name}`}
          translatedName={t(`${name}.button`)}
          label={t(`${name}.label`, {
            selected: t(`${name}.options.${selectedOption}`),
          })}
          selected={t(`${name}.options.${selectedOption}`)}
          openDirection={openDirection}
          handleChange={handleChange}
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
        </PlainSelect>
      )}
      {variant === 'labeled' && <>test</>}
    </>
    // <Select
    //   name={`sort-${name}`}
    //   translatedName={t(`${name}.button`)}
    //   label={t(`${name}.label`, {
    //     selected: t(`${name}.options.${selectedOption}`),
    //   })}
    //   selected={t(`${name}.options.${selectedOption}`)}
    //   variant={variant === 'desktop' ? 'text' : 'outlined'}
    //   Icon={variant === 'desktop' ? SortIcon : undefined}
    //   hasArrow={variant === 'desktop'}
    //   displaySelected={variant === 'desktop'}
    //   openDirection={openDirection}
    //   handleChange={handleChange}
    //   className={className}
    // >
    //   {options.map((option) => (
    //     <SelectOption
    //       key={option}
    //       value={option}
    //       isSelected={option === selectedOption}
    //     >
    //       {t(`${name}.options.${option}`)}
    //     </SelectOption>
    //   ))}
    // </Select>
  );
}
