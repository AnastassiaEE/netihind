'use client';

import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import Option from '@/components/ui/form/fields/select/Option';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
    name,
    variant = 'primary',
    openDirection = 'bottom',
    options,
    selected,
    className,
}: {
    name: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
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
            variant={variant}
            Icon={SortIcon}
            openDirection={openDirection}
            handleChange={handleChange}
            className={className}
        >
            {options.map((option) => (
                <Option key={option} value={option} isSelected={option === selectedOption}>
                    {t(`${name}.options.${option}`)}
                </Option>
            ))}
        </Select>
    );
}
