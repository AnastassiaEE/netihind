import { South, North, AllInclusive } from '@mui/icons-material';

export default function InternetSpeedFeature({
  type,
  speed,
  units,
}: {
  type: 'download' | 'upload';
  speed: number;
  units: string;
}) {
  return (
    <span>
      {type === 'download' && (
        <South fontSize="small" className="inline align-text-bottom" />
      )}
      {type === 'upload' && (
        <North fontSize="small" className="inline align-text-bottom" />
      )}
      <span className="inline font-bold">
        {speed === -1 ? <AllInclusive /> : speed}{' '}
      </span>
      <span className="text-muted">{units}</span>
    </span>
  );
}
