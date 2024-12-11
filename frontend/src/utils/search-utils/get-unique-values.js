export const getUniqueValues = (fetchedPageData, propertyGetter) => {
  if (fetchedPageData) {
    const uniqueSet = new Set();
    fetchedPageData.forEach((item) => {
      const properties = propertyGetter(item);
      properties.forEach((property) => uniqueSet.add(property));
    });
    return Array.from(uniqueSet);
  } else {
    return [];
  }
};
