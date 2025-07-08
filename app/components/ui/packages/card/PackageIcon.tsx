import { SvgIconComponent } from '@mui/icons-material';

export default function PackageIcon({ Icon }: { Icon: SvgIconComponent }) {
  return (
    <div className="absolute flex size-10 items-center justify-center rounded-md bg-primary shadow-md shadow-primary/50 max-md:-top-2 max-md:right-5 md:-left-5">
      <Icon className="text-white" />
    </div>
  );
}
