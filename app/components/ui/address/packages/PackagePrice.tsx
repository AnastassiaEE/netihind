import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function PackagePrice({
    originalPrice,
    promoPrice,
}: {
    originalPrice: number;
    promoPrice: number | null;
}) {
    const t = useTranslations('Packages');
    const priceClasses = classNames(
        'text-lg md:text-xl tracking-tight rounded-lg w-max px-2 py-1',
        promoPrice
            ? 'text-white bg-gradient-to-r from-primary via-secondary to-accent'
            : 'text-muted-dark bg-primary-light',
    );
    const price = promoPrice ?? originalPrice;
    const discountPercentage = promoPrice
        ? Math.ceil(((originalPrice - promoPrice) / promoPrice) * 100)
        : 0;
    return (
        <div className="max-lg:flex max-lg:items-center max-lg:gap-2">
            <p className={priceClasses}>
                <span className="font-extrabold">{price} €</span> / {t('units.month')}
            </p>
            {promoPrice && (
                <div className="mt-1">
                    <p className="text-black font-semibold inline mr-2">{originalPrice}€</p>
                    <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                        -{discountPercentage}%
                    </span>
                </div>
            )}
        </div>
    );
}
