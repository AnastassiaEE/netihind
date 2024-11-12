export const getAddressCookieValues = (cookieString: string) => {
  let cookie = null;
  try {
    cookie = JSON.parse(cookieString);
  } catch {
    cookie = {};
  }
  const fullAddress = cookie.full ?? '';
  const county = cookie.county ?? '';
  const city = cookie.city ?? '';
  const street = cookie.street ?? '';
  const streetNr = cookie.streetNr ?? '';
  const apartment = cookie.apartment ?? '';
  return {
    fullAddress,
    county,
    city,
    street,
    streetNr,
    apartment,
  };
};
