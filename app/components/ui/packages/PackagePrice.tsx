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
    discount_description: string | null;
  };
}) {
  const t = useTranslations('Packages');

  const { discount_price, discount_duration, discount_description } = discount;

  const priceClasses = classNames(
    'w-max rounded-lg px-2 py-1 text-lg tracking-tight md:text-xl',
    discount_price
      ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white'
      : 'bg-primary-light text-muted-dark',
  );

  const finalPrice = discount_price ?? price;
  const discountPercentage = discount_price
    ? Math.ceil(((price - discount_price) / price) * 100)
    : 0;

  return (
    <div>
      <div className="flex flex-wrap gap-2 max-md:justify-center md:flex-col md:items-center">
        <p className={priceClasses}>
          <span className="font-bold">{finalPrice} €</span> / {t('units.month')}
        </p>
        {discount_price && (
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline font-semibold text-black">{price}€</p>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-sm font-medium text-transparent">
              -{discountPercentage}%{' '}
              {t('discount.duration', { months: discount_duration })}
            </span>
          </div>
        )}
      </div>
      {discount_description && (
        <p className="mt-2 text-center text-xs">{discount_description}</p>
      )}
    </div>
  );
}
