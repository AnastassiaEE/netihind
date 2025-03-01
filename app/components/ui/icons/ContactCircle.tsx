import { SvgIconComponent } from '@mui/icons-material';

export default function ContactCircle({ Icon }: { Icon: SvgIconComponent }) {
    return (
        <div className="rounded-full bg-primary-light p-5">
            <Icon className="text-primary" />
        </div>
    );
}
