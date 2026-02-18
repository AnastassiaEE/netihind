import slugify from 'slugify';

const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
const apartmentRegex = /(?<=\-).*$/g;

/**
 * Parses an address object stored in a cookie string.
 *
 * @param cookieString - JSON string from the ADDRESS cookie
 * @returns An object containing:
 *  - `fullAddress`: full street address
 *  - `oid`: address identifier
 *  - `apartment`: apartment number (if any)
 */
export const getAddressCookieValues = (cookieString: string | undefined) => {
  const cookie = JSON.parse(cookieString || '{}');
  const fullAddress = cookie.full ?? '';
  const oid = cookie.oid ?? '';
  const apartment = cookie.apartment ?? '';
  return {
    fullAddress,
    oid,
    apartment,
  };
};

/**
 * Extracts the street portion of an address string.
 *
 * Uses a regex to remove apartment numbers or other trailing info.
 *
 * @param address - Full address string
 * @returns Street part of the address
 */
export const getAddress = (address: string) => {
  return address.match(addressRegex)?.[0] ?? '';
};

/**
 * Extracts the apartment number from an address string.
 *
 * Assumes the apartment follows a hyphen (e.g., "Main St 5-12").
 *
 * @param address - Full address string
 * @returns Apartment number if present, otherwise empty string
 */
export const getApartment = (address: string) => {
  return address.match(apartmentRegex)?.[0] ?? '';
};

/**
 * Converts a full address into a URL-friendly slug.
 *
 * Uses `slugify` with lowercase and Estonian locale.
 * Removes special characters that are unsafe in URLs.
 *
 * @param address - Full address string
 * @returns URL-friendly slug
 */
export const getAddressSlug = (address: string) => {
  return slugify(address, {
    lower: true,
    locale: 'et',
    remove: /[*+~.,()'"!:/@]/g,
  });
};
