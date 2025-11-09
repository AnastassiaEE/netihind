import { Language, North, South } from '@mui/icons-material';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function PackageDescriptionSection({
  downloadSpeed = 0,
  uploadSpeed = 0,
}: {
  downloadSpeed?: number;
  uploadSpeed?: number;
}) {
  const t = useTranslations('Packages');
  const rows = [
    {
      icon: <Language fontSize="large" />,
      label: t('details.connectionType'),
      value: 'Кабельный интернет',
    },
    {
      icon: <South fontSize="large" />,
      label: t('details.speed.download'),
      value: t('details.speed.upTo', {
        value: downloadSpeed,
        unit: t('units.speed'),
      }),
    },
    {
      icon: <North fontSize="large" />,
      label: t('details.speed.upload'),
      value: t('details.speed.upTo', {
        value: uploadSpeed,
        unit: t('units.speed'),
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
