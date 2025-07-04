const getFormattedDate = (date: string, timeZone?: string) =>
  new Date(date).toLocaleDateString('et-ET', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  });

export default getFormattedDate;
