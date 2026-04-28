import { IconSize } from '@/types/ui.types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import classNames from 'classnames';

export default function Pros({
  size = 'medium',
  className,
}: {
  size?: IconSize;
  className?: string;
}) {
  return (
    <RemoveCircleOutlineIcon
      fontSize={size}
      className={classNames(
        'mr-3 inline align-text-bottom text-red-600',
        className,
      )}
    />
  );
}
