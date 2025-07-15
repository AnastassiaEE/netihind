import { IconSize } from '@/types/elements.types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Pros({ size = 'medium' }: { size?: IconSize }) {
  return (
    <i className="inline align-text-bottom">
      <RemoveCircleOutlineIcon fontSize={size} className="mr-3 text-red-600" />
    </i>
  );
}
