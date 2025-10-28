import { SvgIconComponent } from '@mui/icons-material';

export default function ContactCircle({ Icon }: { Icon: SvgIconComponent }) {
  return (
    <span className="h-max rounded-full bg-primary-light p-5">
      <Icon className="text-primary" />
    </span>
  );
}
