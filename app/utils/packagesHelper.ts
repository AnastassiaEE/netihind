export const getProviders = (data: { [key: string]: any }[]) => {
  return Object.values(
    data.reduce((acc, d) => {
      if (!acc[d['provider_name']]) {
        acc[d['provider_name']] = { name: d['provider_name'], img: d['provider_img'] };
      }
      return acc;
    }, {}),
  );
};
