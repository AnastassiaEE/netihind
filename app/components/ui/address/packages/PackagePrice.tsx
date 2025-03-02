import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function PackagePrice({
    originalPrice,
    promoPrice,
}: {
    originalPrice: number;
    promoPrice?: number;
}) {
    const t = useTranslations('Packages');

    const priceClasses = classNames(
        'w-max rounded-lg px-2 py-1 text-lg tracking-tight md:text-xl',
        promoPrice
            ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white'
            : 'bg-primary-light text-muted-dark',
    );

    const price = promoPrice ?? originalPrice;
    const discountPercentage = promoPrice
        ? Math.ceil(((originalPrice - promoPrice) / promoPrice) * 100)
        : 0;

    return (
        <div className="max-lg:flex max-lg:items-center max-lg:gap-2">
            <p className={priceClasses}>
                <span className="font-extrabold text-black">{price} €</span> / {t('units.month')}
            </p>
            {promoPrice && (
                <div className="mt-1">
                    <p className="mr-2 inline font-semibold text-black">{originalPrice}€</p>
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-sm font-medium text-transparent">
                        -{discountPercentage}%
                    </span>
                </div>
            )}
        </div>
    );
}
