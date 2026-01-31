import { Package } from '@/types/packages.types';
import PackageCardPrice from '@/components/ui/packages/card/PackageCardPrice';

export default function PackageCardPriceSection({
  price,
  discount,
  className,
}: {
  price: Package['price'];
  discount: Package['discount'];
  className?: string;
}) {
  return (
    <div className={className}>
      <PackageCardPrice price={price} discount={discount} />
    </div>
  );
}
