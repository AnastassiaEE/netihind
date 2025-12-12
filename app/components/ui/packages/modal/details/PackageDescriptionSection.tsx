import { Language, North, South } from '@mui/icons-material';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { Package } from '@/types/packages.types';
import { useTranslationsContext } from '@/context/TranslationsContext';

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

  const rows = [
    {
      icon: <Language fontSize="large" />,
      label: t('details.connectionType'),
      value:
        translations[technology.description]?.[currentLocale] ??
        technology.description,
    },
    {
      icon: <South fontSize="large" />,
      label: t('details.speed.download'),
      value: t('details.speed.upTo', {
        value: speed.download,
        unit: t('details.units.speed'),
      }),
    },
    {
      icon: <North fontSize="large" />,
      label: t('details.speed.upload'),
      value: t('details.speed.upTo', {
        value: speed.upload,
        unit: t('details.units.speed'),
      }),
    },
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
                <td className={classNames('text-right font-bold', colClasses)}>
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
