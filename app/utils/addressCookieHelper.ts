export const getAddressCookieValues = (cookieString: string | undefined) => {
  const cookie = JSON.parse(cookieString || '{}');
  const fullAddress = cookie.full || '';
  const oid = cookie.oid || '';
  const apartment = cookie.apartment || '';
  return {
    fullAddress,
    oid,
    apartment,
  };
};
