import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getAddressSlug } from '@/utils/addressSlugifier';
import { setRequestLocale } from 'next-intl/server';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';

export default async function PersonalAddress(props: {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug, locale } = params;

  setRequestLocale(locale);

  const cookiesExists = await hasCookie('ADDRESS', { cookies });
  if (!cookiesExists) notFound();
  const cookieString = await getCookie('ADDRESS', { cookies })!;
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
