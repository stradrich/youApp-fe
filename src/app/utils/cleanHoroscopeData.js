// Helper for cleaning western zodiac data (your existing logic, slightly improved)
function cleanWesternZodiacData(messyArray) {
  const result = [];

  messyArray.forEach(obj => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    // Extract sign and date range from key (split by colon)
    const [sign, dateRange] = key.split(':').map(str => str.trim());

    // If value looks like another zodiac sign + date range, parse it too
    if (typeof value === 'string' && value.includes('–')) {
      const [nextSign, nextDateRange] = value.split(':').map(str => str.trim());
      if (sign && dateRange) {
        result.push({ sign, dateRange });
      }
      if (nextSign && nextDateRange) {
        result.push({ sign: nextSign, dateRange: nextDateRange });
      }
    } else {
      if (sign && dateRange) {
        result.push({ sign, dateRange });
      }
    }
  });

  // Deduplicate by sign
  const unique = Array.from(new Map(result.map(item => [item.sign, item])).values());

  return unique;
}

// Helper for parsing Chinese zodiac CSV data
function parseChineseZodiacCSV(dataArray) {
  // dataArray is already [{ startDate, endDate, animal }, {...}, ...]
  // Adapt to your actual keys:
  return dataArray.map(item => {
    // From your example, keys are a bit weird, e.g.
    // { '2023 January 22': '2022 February 1', '2024 February 9': '2023 January 21', Rabbit: 'Tiger' }
    // So pick the right fields by keys:
    const keys = Object.keys(item);
    // Assume startDate = keys[0], endDate = keys[1], animal = item[keys[2]]
    return {
      startDate: item[keys[0]],
      endDate: item[keys[1]],
      animal: item[keys[2]],
    };
  });
}

// Main normalizer function
export function normalizeZodiacData(type, data) {
  if (type === 'western') {
    return cleanWesternZodiacData(data);
  } else if (type === 'chinese') {
    return parseChineseZodiacCSV(data);
  } else {
    throw new Error(`Unsupported zodiac type: ${type}`);
  }
}







