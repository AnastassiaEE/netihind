import { Package } from '@/types/packages.types';
import PackageCardPrice from '@/components/ui/packages/card/PackageCardPrice';

interface PackageCardPriceSectionProps
  extends Pick<Package, 'price' | 'discount'> {
  className?: string;
}

export default function PackageCardPriceSection({
  price,
  discount,
  className,
}: PackageCardPriceSectionProps) {
  return (
    <div className={className}>
      <PackageCardPrice price={price} discount={discount} />
    </div>
  );
}
