import { SvgIconComponent } from '@mui/icons-material';

export default function PackageIcon({ Icon }: { Icon: SvgIconComponent }) {
    return (
        <div className="w-10 h-10 bg-primary rounded-md absolute shadow-md shadow-primary/50 max-md:right-5 max-md:-top-2 md:-left-5 flex justify-center items-center">
            <Icon className="text-white" />
        </div>
    );
}
