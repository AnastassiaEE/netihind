import NavigationItem from '@/components/ui/navigation/NavigationItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import classNames from 'classnames';

export default function Copyright({ className }: { className?: string }) {
  return (
    <p className={classNames('text-center', className)}>
      © All rights reserved. Made with <FavoriteBorderIcon fontSize="small" />{' '}
      by{' '}
      <span className="font-semibold">
        <NavigationItem href="/">Netihind.ee</NavigationItem>
      </span>
    </p>
  );
}
