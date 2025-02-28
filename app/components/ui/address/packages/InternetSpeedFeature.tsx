import { Download, Upload, AllInclusive } from '@mui/icons-material';

export default function InternetSpeedFeature({
    type,
    speed,
    units,
}: {
    type: 'download' | 'upload';
    speed: string;
    units: string;
}) {
    return (
        <span>
            {type === 'download' && <Download className="text-green-700" />}
            {type === 'upload' && <Upload className="text-red-700" />}
            <span className="font-bold">{speed ?? <AllInclusive />} </span>
            <span className="text-muted">{units}</span>
        </span>
    );
}
