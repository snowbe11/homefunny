export const toKrDateString = (date: Date) : string => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });    
}

export const normalizeTimeToday = (date : Date) => {
  const l_date = new Date();
  l_date.setHours(date.getHours());
  l_date.setMinutes(date.getMinutes());

  return l_date;
}