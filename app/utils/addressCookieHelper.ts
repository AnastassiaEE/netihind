export const getAddressCookieValues = (cookieString: string) => {
  let cookie = null;
  try {
    cookie = JSON.parse(cookieString);
  } catch {
    cookie = {};
  }
  const fullAddress = cookie.full ?? '';
  const oid = cookie.oid ?? '';
  const apartment = cookie.apartment ?? '';
  return {
    fullAddress,
    oid,
    apartment,
  };
};
