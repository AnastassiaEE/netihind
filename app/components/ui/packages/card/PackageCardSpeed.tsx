import { South, North, AllInclusive } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export default function InternetCardSpeed({
  type,
  speed,
}: {
  type: 'download' | 'upload';
  speed: number;
}) {
  const t = useTranslations('Packages.details');

  const label = type === 'download' ? t('speed.download') : t('speed.upload');
  const valueText =
    speed < 0
      ? t('speed.unlimited')
      : t('speed.upTo', { value: speed, unit: t('units.speed') });

  return (
    <div
      aria-label={`${label}: ${valueText}`}
      className="flex items-center gap-x-0.5"
    >
      {type === 'download' && (
        <South fontSize="small" className="inline align-text-bottom" />
      )}
      {type === 'upload' && (
        <North fontSize="small" className="inline align-text-bottom" />
      )}
      <span className="font-bold">
        {speed < 0 ? (
          <AllInclusive fontSize="small" className="inline align-text-bottom" />
        ) : (
          speed
        )}
      </span>
      <span className="text-muted">{t('units.speed')}</span>
    </div>
  );
}
