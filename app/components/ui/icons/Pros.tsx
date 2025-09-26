import { IconSize } from '@/types/elements.types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import classNames from 'classnames';

export default function Pros({
  size = 'medium',
  className,
}: {
  size?: IconSize;
  className?: string;
}) {
  return (
    <AddCircleOutlineIcon
      fontSize={size}
      className={classNames(
        'mr-3 inline align-text-bottom text-green-600',
        className,
      )}
    />
  );
}
