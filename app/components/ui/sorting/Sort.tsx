'use client';

import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import Option from '@/components/ui/form/fields/select/Option';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
    options,
    selected,
    name,
    variant = 'primary',
    openDirection = 'bottom',
    className,
}: {
    options: string[];
    selected: string;
    name: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    type?: 'arrow' | 'button';
    openDirection?: 'top' | 'bottom';
    className?: string;
}) {
    const t = useTranslations('Sort');
    const { selectedOption, handleChange } = useSort(selected);

    return (
        <Select
            name={name}
            translatedName={t(name)}
            selected={t(selectedOption)}
            variant={variant}
            Icon={SortIcon}
            openDirection={openDirection}
            handleChange={handleChange}
            className={className}
        >
            {options.map((option) => (
                <Option key={option} value={option} isSelected={option === selectedOption}>
                    {t(option)}
                </Option>
            ))}
        </Select>
    );
}
