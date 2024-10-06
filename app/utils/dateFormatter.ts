const getFormattedDate = (date: string) =>
  new Date(date).toLocaleDateString('et-ET', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export default getFormattedDate;
