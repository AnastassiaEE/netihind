import { SvgIconComponent } from '@mui/icons-material';

export default function CircleContactIcon({ Icon }: { Icon: SvgIconComponent }) {
    return (
        <div className="p-5 bg-neutral-light rounded-full">
            <Icon className="text-primary" />
        </div>
    );
}
