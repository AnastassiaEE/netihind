import { South, North, AllInclusive } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export default function InternetSpeedFeature({
  type,
  speed,
}: {
  type: 'download' | 'upload';
  speed: number;
}) {
  const t = useTranslations('Packages.details');
  return (
    <div
      aria-label={
        type === 'download'
          ? `${t('speed.download')}: ${speed === -1 ? t('speed.unlimited') : `${speed} ${t('units.speed')}`}`
          : `${t('speed.upload')}: ${speed === -1 ? t('speed.unlimited') : `${speed} ${t('units.speed')}`}`
      }
      className="flex items-center gap-x-0.5"
    >
      {type === 'download' && (
        <South fontSize="small" className="inline align-text-bottom" />
      )}
      {type === 'upload' && (
        <North fontSize="small" className="inline align-text-bottom" />
      )}
      <span className="font-bold">
        {speed === -1 ? (
          <AllInclusive fontSize="small" className="inline align-text-bottom" />
        ) : (
          speed
        )}
      </span>
      <span className="text-muted">{t('units.speed')}</span>
    </div>
  );
}
