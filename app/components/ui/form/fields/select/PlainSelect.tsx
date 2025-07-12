import Button from '@/components/ui/form/buttons/Button';
import Select from '@/components/ui/form/fields/select/Select';
import { FormElementSizes as sizes } from '@/styles/styles';
import classNames from 'classnames';

export default function PlainSelect({
  size = 'sm',
  name,
  translatedName,
  label,
  selected,
  openDirection = 'bottom',
  handleChange,
  className,
  children,
}: {
  size?: keyof typeof sizes;
  name: string;
  translatedName?: string;
  label: string;
  selected: string;
  openDirection: 'top' | 'bottom';
  handleChange: (name: string, value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const comboBoxClasses = classNames(sizes[size], className, 'uppercase');

  const ComboBox = (comboBoxProps: any) => (
    <Button {...comboBoxProps} variant="outlined" className={comboBoxClasses}>
      {translatedName ?? name}
    </Button>
  );

  return (
    <Select
      name={name}
      label={label}
      selected={selected}
      openDirection={openDirection}
      handleChange={handleChange}
      comboBoxElement={(comboBoxProps: any) => <ComboBox {...comboBoxProps} />}
    >
      {children}
    </Select>
  );
}
