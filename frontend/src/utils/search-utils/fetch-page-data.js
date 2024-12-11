import retry from 'async-retry';
import pLimit from 'p-limit';

export const fetchPageData = async (
  totalItems,
  cacheKey,
  basePath,
  dataNormalizer,
) => {
  try {
    const localStorageData = localStorage.getItem(cacheKey);
    if (localStorageData) {
      return JSON.parse(localStorageData);
    }
  } catch (error) {
    console.error(
      `There was a problem with the localStorage operation: ${error.message}`,
    );
  }

  try {
    const urls = [
      ...Array.from(
        { length: totalItems - 1 },
        (_, i) => `/page-data/${basePath}/${i + 1}/page-data.json`,
      ),
      `/page-data/${basePath}/page-data.json`,
    ];

    const fetchWithRetry = async (url) => {
      return await retry(
        async (bail) => {
          const response = await fetch(url);
          if (!response.ok && response.status !== 404) {
            console.warn(`Retry fetch for url: ${url}`);
            throw new Error(
              `HTTP error! status: ${response.status} at url: ${url}`,
            );
          }

          const responseData = await response.json();
          return responseData.result?.data || [];
        },
        {
          retries: 3,
        },
      );
    };

    const limit = pLimit(3);
    let allPosts = await Promise.all(
      urls.map((url) => limit(() => fetchWithRetry(url))),
    );

    try {
      allPosts = allPosts.flat().map((data) => dataNormalizer(data));
    } catch (error) {
      console.error(
        `There was an problem with dataNormalizer: ${dataNormalizer}`,
      );
    }

    const pageData = allPosts.flat().reverse();
    localStorage.setItem(cacheKey, JSON.stringify(pageData));
    return pageData;
  } catch (error) {
    console.error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};
