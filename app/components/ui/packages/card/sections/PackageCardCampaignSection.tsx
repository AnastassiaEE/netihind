import { Package } from '@/types/packages.types';

interface PackageCardCampaignSectionProps
  extends Pick<Package, 'discount_campaigns'> {
  className?: string;
}
export default function PackageCardCampaignSection({
  discount_campaigns,
  className,
}: PackageCardCampaignSectionProps) {
  return <></>;
}
