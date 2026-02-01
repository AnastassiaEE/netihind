import { useTranslationsContext } from '@/context/TranslationsContext';
import { DiscountCampaign, Package } from '@/types/packages.types';
import CampaignIcon from '@mui/icons-material/Campaign';
import classNames from 'classnames';
import { useLocale } from 'next-intl';

interface PackageCardCampaignSectionProps
  extends Pick<Package, 'discount_campaigns'> {
  className?: string;
}
export default function PackageCardCampaignSection({
  discount_campaigns,
  className,
}: PackageCardCampaignSectionProps) {
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  return (
    <div className={classNames(className, 'flex items-start gap-2')}>
      <CampaignIcon className="text-yellow-400" fontSize="large" />
      <div className="space-y-1">
        {discount_campaigns.map((campaign: DiscountCampaign, index: number) => (
          <p key={index} className="text-sm">
            {translations[campaign.description]?.[currentLocale] ??
              campaign.description}
          </p>
        ))}
      </div>
    </div>
  );
}
