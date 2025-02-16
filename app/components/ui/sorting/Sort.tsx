'use client'

import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import Option from '@/components/ui/form/fields/select/Option';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
    options,
    selected,
    variant = 'primary',
    openDirection = 'bottom',
}: {
    options: string[];
    selected: string;
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    type?: 'arrow' | 'button';
    openDirection?: 'top' | 'bottom';
}) {
    const t = useTranslations('Sort');
    const { selectedOption, handleChange } = useSort(selected);

    return (
        <Select
            name={t('sort')}
            selected={t(selectedOption)}
            variant={variant}
            Icon={SortIcon}
            openDirection={openDirection}
            className="min-w-[150px] max-w-max"
        >
            {options.map((option) => (
                <Option
                    key={option}
                    value={option}
                    text={t(option)}
                    handleClick={() => handleChange(option)}
                    isSelected={option === selectedOption}
                />
            ))}
        </Select>
    );
}
