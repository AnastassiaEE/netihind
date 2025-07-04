import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getAddressSlug } from '@/utils/addressSlugifier';
import { setRequestLocale } from 'next-intl/server';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';

export default function PersonalAddress({
  params: { slug, locale },
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: { [key: string]: string };
}) {
  setRequestLocale(locale);

  if (!hasCookie('ADDRESS', { cookies })) notFound();
  const cookieString = getCookie('ADDRESS', { cookies })!;
  const { fullAddress: address, oid } = getAddressCookieValues(cookieString);
  const addressSlug = getAddressSlug(address);
  if (slug !== addressSlug) notFound();
  return (
    <AddressPackagesSection
      searchParams={searchParams}
      address={address}
      oid={oid}
    />
  );
}
