import { useTranslations } from 'next-intl';
import SortIcon from '@mui/icons-material/Sort';
import Option from '@/components/ui/form/fields/select/Option';
import useSort from '@/hooks/useSort';
import Select from '@/components/ui/form/fields/select/Select';

export default function Sort({
    options,
    selectedOption,
    type = 'arrow',
    openDirection = 'bottom',
}: {
    options: string[];
    selectedOption: string;
    type?: 'arrow' | 'button';
    openDirection?: 'top' | 'bottom';
}) {
    const t = useTranslations('Sort');
    const { selected, handleOptionClick } = useSort(selectedOption);

    return (
        <Select
            name={t('sort')}
            selected={t(selected)}
            type={type}
            variant={type === 'arrow' ? 'primary' : undefined}
            Icon={type === 'arrow' ? SortIcon : undefined}
            openDirection={openDirection}
            className="min-w-[150px] max-w-max"
        >
            {options.map((option) => (
                <Option
                    key={option}
                    value={option}
                    text={t(option)}
                    handleClick={() => handleOptionClick(option)}
                    isSelected={option === selected}

                />
            ))}
        </Select>
    );
}
