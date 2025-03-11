'use client';

import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';
import SelectOption from '@/components/ui/form/fields/select/SelectOption';

export default function Sort({
    name,
    variant = 'desktop',
    openDirection = 'bottom',
    options,
    selected,
    className,
}: {
    name: string;
    variant?: 'desktop' | 'mobile';
    openDirection?: 'top' | 'bottom';
    options: string[];
    selected: string;
    className?: string;
}) {
    const t = useTranslations('Sort');
    const { selectedOption, handleChange } = useSort(selected);

    return (
        <Select
            name={`sort-${name}`}
            translatedName={t(`${name}.button`)}
            label={t(`${name}.label`, { selected: t(`${name}.options.${selectedOption}`) })}
            selected={t(`${name}.options.${selectedOption}`)}
            variant={variant === 'desktop' ? 'flat' : 'secondary'}
            Icon={variant === 'desktop' ? SortIcon : undefined}
            hasArrow={variant === 'desktop'}
            displaySelected={variant === 'desktop'}
            openDirection={openDirection}
            handleChange={handleChange}
            className={className}
        >
            {options.map((option) => (
                <SelectOption key={option} value={option} isSelected={option === selectedOption}>
                    {t(`${name}.options.${option}`)}
                </SelectOption>
            ))}
        </Select>
    );
}
