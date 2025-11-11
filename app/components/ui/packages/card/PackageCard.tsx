import classNames from 'classnames';
import { useLocale } from 'next-intl';
import { PackageAction } from '@/types/packages.types';
import { useTranslationsContext } from '@/context/TranslationsContext';
import { Package } from '@/types/packages.types';
import PackageCardHeaderSection from '@/components/ui/packages/card/sections/PackageCardHeaderSection';
import PackageCardDetailsSection from '@/components/ui/packages/card/sections/PackageCardDetailsSection';
import PackageCardPriceSection from '@/components/ui/packages/card/sections/PackageCardPriceSection';
import PackageCardActions from '@/components/ui/packages/card/PackageCardActions';

export default function PackageCard({
  data,
  onActionClick,
  className,
}: {
  data: Package;
  onActionClick: (action: PackageAction) => void;
  className?: string;
}) {
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  const cardClasses = classNames(
    'rounded-md border border-muted-light bg-white shadow-md',
    className,
  );

  const {
    id,
    name,
    provider,
    speed,
    infrastructure,
    technology,
    installation,
    price,
  } = data;

  return (
    <article data-id={id} className={cardClasses}>
      <div className="grid gap-0 lg:grid-cols-3">
        <PackageCardHeaderSection
          name={name}
          technology={technology}
          provider={provider}
          speed={speed}
          infrastructure={infrastructure}
          className="border-b border-b-muted-light px-8 py-5 lg:col-span-2 lg:row-start-1 lg:border-r lg:border-r-muted-light"
        />
        <PackageCardDetailsSection
          installation={installation}
          className="px-8 py-3 max-lg:border-b max-lg:border-b-muted-light lg:col-span-2 lg:row-start-2 lg:border-r lg:border-r-muted-light"
        />
        <PackageCardPriceSection
          price={price}
          className="flex flex-col items-center justify-center gap-1 p-4 lg:row-span-2"
        />
      </div>
      <PackageCardActions onActionClick={onActionClick} className="flex" />
    </article>
  );
}
