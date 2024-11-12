import slugify from 'slugify';

export const getAddressSlug = (address: string) => {
  return slugify(address, {
    lower: true,
    locale: 'et',
    remove: /[*+~.,()'"!:/@]/g,
  });
};
