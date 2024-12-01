import { SvgIconComponent } from '@mui/icons-material';

export default function ContactCircle({ Icon }: { Icon: SvgIconComponent }) {
    return (
        <div className="p-5 bg-primary-light rounded-full">
            <Icon className="text-primary" />
        </div>
    );
}
