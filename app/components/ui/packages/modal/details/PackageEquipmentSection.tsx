import Tooltip from '@/components/ui/overlay/Tooltip';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { EquipmentItem } from '@/types/packages.types';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function PackageEquipmentSection({
  equipment,
}: {
  equipment: EquipmentItem[][];
}) {
  const t = useTranslations('Packages');

  console.log(equipment);

  return (
    <PackageModalSection
      title={t('modals.details.sections.equipment')}
      className="bg-white"
    >
      <p className="mb-5">{t('details.equipment.allCombinations')}</p>

      {equipment.length === 0 ? (
        <p className="text-center text-lg">
          {t('details.equipment.noEquipment')}
        </p>
      ) : (
        <div className="overflow-x-auto">
          {equipment.map((combination, i) => (
            <table key={i} className="over">
              <tbody>
                <tr>
                  <td></td>
                  {combination.map((device, idx) => (
                    <React.Fragment key={device.id}>
                      <td>
                        {device.model || device.description ? (
                          <Tooltip
                            elementToInteract={
                              <p className="text-primary underline">
                                {device.type}
                              </p>
                            }
                            content={`${device.model ?? ''}${
                              device.model && device.description
                                ? ` - ${device.description}`
                                : (device.description ?? '')
                            }`}
                          />
                        ) : (
                          <p>{device.type}</p>
                        )}
                      </td>
                      {idx < combination.length - 1 && <td>+</td>}
                    </React.Fragment>
                  ))}
                </tr>

                {['rent', 'järelmaks', 'väljaost'].map((payment) => (
                  <tr key={payment}>
                    <td>{payment}</td>

                    {combination.map((device, idx) => (
                      <React.Fragment key={device.id}>
                        <td></td>
                        {idx < combination.length - 1 && <td></td>}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </PackageModalSection>
  );
}
