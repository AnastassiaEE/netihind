import TextDivider from '@/components/ui/dividers/TextDivider';
import Tooltip from '@/components/ui/overlay/Tooltip';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { useTranslationsContext } from '@/context/TranslationsContext';
import { EquipmentItem } from '@/types/packages.types';
import { formatMoney } from '@/utils/numberFormatter';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

//  Temporary fixed order
const PAYMENT_OPTION_ORDER = ['rent', 'installments', 'full_purchase'] as const;

const getPaymentOptionRank = (option: string) => {
  const index = PAYMENT_OPTION_ORDER.indexOf(
    option as (typeof PAYMENT_OPTION_ORDER)[number],
  );
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

export default function PackageEquipmentSection({
  equipment,
}: {
  equipment: EquipmentItem[][];
}) {
  const tPackages = useTranslations('Packages');
  const tDividers = useTranslations('Dividers');
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  const borderedCellClasses =
    'text-[0.95rem] border border-muted-light p-1.5 min-w-40';
  const borderlessCellClasses = 'text-[0.95rem] border-b-0 border-t-0 p-1.5';
  const priceClasses = 'font-semibold';

  const getCombinationPaymentOptions = (combination: EquipmentItem[]) =>
    Array.from(
      new Set(combination.flatMap((device) => Object.keys(device.payment))),
    ).sort((a, b) => {
      const rankDiff = getPaymentOptionRank(a) - getPaymentOptionRank(b);
      return rankDiff !== 0 ? rankDiff : a.localeCompare(b);
    });

  function EquipmentHeader({ device }: { device: EquipmentItem }) {
    const deviceType =
      translations[device.type]?.[currentLocale] ?? device.type;

    const translatedDescription = device.description
      ? (translations[device.description]?.[currentLocale] ??
        device.description)
      : '';

    const tooltipContent = translatedDescription || device.model || '';

    if (!tooltipContent) {
      return <p>{deviceType}</p>;
    }

    return (
      <Tooltip
        elementToInteract={
          <p className="text-primary underline">{deviceType}</p>
        }
        content={tooltipContent}
      />
    );
  }

  function renderEquipmentPayment(
    paymentOption: string,
    payment: EquipmentItem['payment'][string] | undefined,
  ) {
    if (!payment) return '';
    const price = formatMoney(payment.price);
    if ('installments_months' in payment)
      return (
        <>
          <span className={priceClasses}>{price} €</span> /{' '}
          {tPackages('details.units.month')} ({payment.installments_months}{' '}
          {tPackages('details.units.months')})
        </>
      );
    if (paymentOption === 'rent')
      return (
        <>
          <span className={priceClasses}> {price} € </span> /{' '}
          {tPackages('details.units.month')}
        </>
      );
    return (
      <>
        <span className={priceClasses}>{price} €</span>
      </>
    );
  }

  function getCellClasses(device: EquipmentItem, paymentOption: string) {
    const hasPayment = device.payment[paymentOption] !== undefined;
    return hasPayment ? borderedCellClasses : borderlessCellClasses;
  }

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
          {equipment.map((combination, i) => {
            const paymentOptions = getCombinationPaymentOptions(combination);

            return (
              <React.Fragment key={i}>
                <table className="border-collapse">
                  <tbody>
                    <tr className="text-center">
                      <td></td>
                      <td className={borderlessCellClasses}></td>
                      {combination.map((device, idx) => (
                        <React.Fragment key={device.id}>
                          <td className={borderlessCellClasses}>
                            <EquipmentHeader device={device} />
                          </td>
                          {idx < combination.length - 1 && (
                            <td className={borderlessCellClasses}>+</td>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>

                    {paymentOptions.map((paymentOption) => (
                      <tr key={paymentOption}>
                        <td
                          className={classNames(
                            borderlessCellClasses,
                            'capitalize',
                          )}
                        >
                          {translations[paymentOption]?.[currentLocale] ??
                            paymentOption}
                        </td>
                        <td className={borderlessCellClasses}></td>

                        {combination.map((device, idx) => (
                          <React.Fragment key={device.id}>
                            <td
                              className={getCellClasses(device, paymentOption)}
                            >
                              {renderEquipmentPayment(
                                paymentOption,
                                device.payment[paymentOption],
                              )}
                            </td>
                            {idx < combination.length - 1 && (
                              <td className={borderlessCellClasses}></td>
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
            );
          })}
        </div>
      )}
    </PackageModalSection>
  );
}
