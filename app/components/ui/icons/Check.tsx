import { IconSize } from '@/types/elements.types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import classNames from 'classnames';

export default function Check({
  size = 'medium',
  className,
}: {
  size?: IconSize;
  className?: string;
}) {
  return (
    <CheckCircleOutlineIcon
      fontSize={size}
      className={classNames('mr-2 inline text-primary', className)}
    />
  );
}
