import { Package } from '@/types/packages.types';
import PackagePrice from '@/components/ui/packages/card/PackageCardPrice';

export default function PackageCardPriceSection({
  price,
  className,
}: {
  price: Package['price'];
  className?: string;
}) {
  return (
    <div className={className}>
      <PackagePrice
        price={price}
        discount={{
          discount_price: null,
          discount_duration: null,
        }}
      />
    </div>
  );
}
