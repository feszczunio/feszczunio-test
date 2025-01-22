import { useState, useEffect } from 'react';
import { fetchPageData } from '../utils/search-utils/fetch-page-data';

export const useFetchPageData = (
  totalItems,
  cacheKey,
  basePath,
  dataNormalizer
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [error, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedPageData = await fetchPageData(
          totalItems,
          cacheKey,
          basePath,
          dataNormalizer,
        );

        setData(fetchedPageData);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [totalItems, cacheKey, basePath, dataNormalizer]);

  return { data, isLoading, isError, error };
};
