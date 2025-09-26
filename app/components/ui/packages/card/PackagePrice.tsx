import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function PackagePrice({
  price,
  discount,
}: {
  price: number;
  discount: {
    discount_price: number | null;
    discount_duration: string | null;
  };
}) {
  const t = useTranslations('Packages');

  const { discount_price, discount_duration } = discount;

  const priceClasses = classNames(
    'w-max rounded-md px-2 py-1 text-lg tracking-tight md:text-xl',
    discount_price
      ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white'
      : 'bg-primary-light text-muted-dark',
  );

  const finalPrice = discount_price ?? price;
  const discountPercentage = discount_price
    ? Math.ceil(((price - discount_price) / price) * 100)
    : 0;

  return (
    <>
      <p className={priceClasses}>
        <span className="font-bold">{finalPrice} €</span> / {t('units.month')}
      </p>
      {discount_price && (
        <>
          <p className="font-semibold text-black">
            {price}€
            <span className="ml-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-sm font-medium text-transparent">
              -{discountPercentage}%{' '}
              {t('discount.duration', { months: discount_duration ?? '' })}
            </span>
          </p>
        </>
      )}
    </>
  );
}
