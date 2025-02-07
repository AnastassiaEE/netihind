import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import Option from '@/components/ui/form/fields/select/Option';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
    options,
    variant = 'primary',
    openDirection = 'bottom',
}: {
    options: { [key: string]: boolean };
    variant?: 'primary' | 'secondary' | 'neutral' | 'flat';
    type?: 'arrow' | 'button';
    openDirection?: 'top' | 'bottom';
}) {
    const t = useTranslations('Sort');
    const { usedOptions, handleOptionClick } = useSort(options);

    return (
        <Select
            name={t('sort')}
            selected={t(Object.entries(usedOptions).find(([key, value]) => value)?.[0] || 'default')}
            variant={variant}
            Icon={SortIcon}
            openDirection={openDirection}
            className="min-w-[150px] max-w-max"
        >
            {Object.entries(usedOptions).map(([option, isSelected]) => (
                <Option
                    key={option}
                    value={option}
                    text={t(option)}
                    handleClick={() => handleOptionClick(option)}
                    isSelected={isSelected}
                />
            ))}
        </Select>
    );
}
