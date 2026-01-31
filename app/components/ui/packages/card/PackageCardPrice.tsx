import { Package } from '@/types/packages.types';
import { formatMoney } from '@/utils/numberFormatter';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function PackageCardPrice({
  price,
  discount,
}: {
  price: number;
  discount: Package['discount'];
}) {
  const t = useTranslations('Packages');

  const { price: discount_price, duration: discount_duration } = discount ?? {
    price: null,
    duration: null,
  };

  const priceClasses = classNames(
    'w-max rounded-md px-2 py-1 text-lg tracking-tight md:text-xl',
    discount_price
      ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white'
      : 'bg-primary-light text-muted-dark',
  );

  const finalPrice = formatMoney(discount_price ?? price);
  const discountPercentage = discount_price
    ? Math.ceil(((price - discount_price) / price) * 100)
    : 0;

  return (
    <>
      <p className={priceClasses} aria-hidden="true">
        <span className="font-bold">{finalPrice} €</span>
        <span>{` / ${t('details.units.month')}`}</span>
      </p>
      <p className="sr-only">{`${t('details.price.label')}: ${finalPrice} €`}</p>
      {discount_price && (
        <>
          <p
            className="mt-1 text-center text-sm font-semibold text-black"
            aria-hidden="true"
          >
            {formatMoney(price)} €{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-sm font-medium text-transparent">
              -{discountPercentage}%{' '}
              {discount_duration &&
                t('discount.duration', { months: discount_duration })}
            </span>
          </p>
          <p className="sr-only">
            {t('details.price.regularPrice', {
              price: formatMoney(price),
              discount_percentage: discountPercentage,
            })}
            {discount_duration &&
              t('discount.duration', { months: discount_duration })}
          </p>
        </>
      )}
    </>
  );
}
