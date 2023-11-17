export function formatDate(date: any) {
  if (!date || !(date instanceof Date)) return '';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long'
  }).format(date);
}