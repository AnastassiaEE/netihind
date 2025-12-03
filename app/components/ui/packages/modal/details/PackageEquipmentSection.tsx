import TextDivider from '@/components/ui/dividers/TextDivider';
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
  const tPackages = useTranslations('Packages');
  const tDividers = useTranslations('Dividers');

  const borderedTdClasses = 'border border-muted-light p-1.5';
  const borderlessTdClasses = 'border-b-0 border-t-0 p-1.5';

  console.log(equipment);

  return (
    <PackageModalSection
      title={tPackages('modals.details.sections.equipment')}
      className="bg-white"
    >
      <p className="mb-5">{tPackages('details.equipment.allCombinations')}</p>

      {equipment.length === 0 ? (
        <p className="text-center text-lg">
          {tPackages('details.equipment.noEquipment')}
        </p>
      ) : (
        <div className="overflow-x-auto">
          {equipment.map((combination, i) => (
            <React.Fragment key={i}>
              <table className="border-collapse">
                <tbody>
                  <tr className="text-center">
                    <td></td>
                    <td className={borderlessTdClasses}></td>
                    {combination.map((device, idx) => (
                      <React.Fragment key={device.id}>
                        <td className={borderlessTdClasses}>
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
                        {idx < combination.length - 1 && (
                          <td className={borderlessTdClasses}>+</td>
                        )}
                      </React.Fragment>
                    ))}
                  </tr>

                  {['rent', 'järelmaks', 'väljaost'].map((payment) => (
                    <tr key={payment}>
                      <td className={borderlessTdClasses}>{payment}</td>
                      <td className={borderlessTdClasses}></td>
                      {combination.map((device, idx) => (
                        <React.Fragment key={device.id}>
                          <td className={borderedTdClasses}></td>
                          {idx < combination.length - 1 && (
                            <td className={borderlessTdClasses}></td>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {i < equipment.length - 1 && (
                <TextDivider text={tDividers('or')} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </PackageModalSection>
  );
}
