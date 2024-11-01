const getFormattedSlug = (slug: string) => {
  let newSlug = slug;
  ['ru', 'et'].forEach((locale) => {
    newSlug = newSlug.replace(new RegExp(`-${locale}$`, 'g'), '');
  });
  return newSlug;
};

export default getFormattedSlug;
