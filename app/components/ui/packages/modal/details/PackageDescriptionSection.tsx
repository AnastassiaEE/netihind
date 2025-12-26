import { Language, North, South, AllInclusive } from '@mui/icons-material';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { Package } from '@/types/packages.types';
import { useTranslationsContext } from '@/context/TranslationsContext';

interface Row {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  ariaLabel?: string;
}

export default function PackageDescriptionSection({
  speed = { download: 0, upload: 0 },
  technology = { name: '', description: '' },
}: {
  speed?: Package['speed'];
  technology?: Package['technology'];
}) {
  const t = useTranslations('Packages');
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  const formatSpeed = (value: number) =>
    value < 0
      ? t.rich('details.speed.unlimitedRich', {
          InfinityIcon: () => (
            <AllInclusive className="mx-0.5 inline-block align-bottom" />
          ),
          unit: t('details.units.speed'),
        })
      : t('details.speed.upTo', {
          value,
          unit: t('details.units.speed'),
        });

  const formatSpeedAriaLabel = (value: number) =>
    value < 0
      ? t('details.speed.unlimited')
      : t('details.speed.upTo', { value, unit: t('details.units.speed') });

  const getSpeedRow = (type: 'download' | 'upload') => ({
    icon:
      type === 'download' ? (
        <South fontSize="large" />
      ) : (
        <North fontSize="large" />
      ),
    label:
      type === 'download'
        ? t('details.speed.download')
        : t('details.speed.upload'),
    value: formatSpeed(speed[type]),
    ariaLabel: formatSpeedAriaLabel(speed[type]),
  });

  const rows: Row[] = [
    {
      icon: <Language fontSize="large" />,
      label: t('details.connectionType'),
      value:
        translations[technology.description]?.[currentLocale] ??
        technology.description,
    },
    getSpeedRow('download'),
    getSpeedRow('upload'),
  ];

  const colClasses = 'py-0.5';

  return (
    <PackageModalSection
      title={t('modals.details.sections.description')}
      className="bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className={classNames('w-10', colClasses)}>{row.icon}</td>
                <td className={colClasses}>{row.label}</td>
                <td
                  aria-label={row.ariaLabel}
                  className={classNames('text-right font-bold', colClasses)}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PackageModalSection>
  );
}
