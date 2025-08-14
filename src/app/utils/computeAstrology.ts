export function getWesternHorroscope(birthday, cleanedWesternHoroscope) {
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();

  for (const { sign, dateRange } of cleanedWesternHoroscope) {
    const [startStr, endStr] = dateRange.split('–');

    const startDate = new Date(`${startStr} 2000`);
    const endDate = new Date(`${endStr} 2000`);
    const userDate = new Date(`2000-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    if (endDate < startDate) {
      if (userDate >= startDate || userDate <= endDate) return sign;
    } else {
      if (userDate >= startDate && userDate <= endDate) return sign;
    }
  }

  return null;
}

export function getChineseZodiac(birthday, cleanedChineseZodiac) {
  for (const { startDate, endDate, animal } of cleanedChineseZodiac) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (birthday >= start && birthday <= end) return animal;
  }
  return null;
}
