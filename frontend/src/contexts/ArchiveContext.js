import React, { createContext, useContext, useMemo } from 'react';
import { useFetchPageData } from '../hooks/useFetchPageData';
import { Index } from 'flexsearch';
import { navigate } from 'gatsby';
import { useStatikPageContext } from '@statik-space/gatsby-theme-statik/src/hooks';
import qs from 'query-string';
import { useIsMounted } from '../hooks/useIsMounted';
import { Loader } from "../components/commons/Loader";

export const ArchiveContext = createContext(undefined);

export const useArchiveContext = () => useContext(ArchiveContext);

export const ArchiveProvider = (props) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <Loader />;
  }

  return <View {...props} />;
};

const View = (props) => {
  const {
    children,
    totalItems,
    cacheKey,
    basePath,
    dataExtractor,
    indexValues,
    params,
  } = props;

  const pageContext = useStatikPageContext();

  let queryParams = parseQuery(pageContext.location.search);
  queryParams = assignDefaultValues(queryParams, params);

  const findPhases = useMemo(() => ({
    search: getParamsByType(params, ParamType.SEARCH),
    filter: getParamsByType(params, ParamType.FILTER),
    sort: getParamsByType(params, ParamType.SORT),
  }), [params]);

  const { data, isLoading, isError, error } = useFetchPageData(
    totalItems,
    cacheKey,
    basePath,
    dataExtractor,
  );

  const index = useMemo(() => createSearchIndex(data, indexValues), [data, indexValues]);

  const setQueryParams = async (qp) => {
    const parsed = parseQuery(pageContext.location.search);

    Object.keys(qp).forEach((key) => {
      const filter = params.find((filter) => filter.id === key);
      if (filter && filter.defaultValue === qp[key]) {
        qp[key] = undefined;
      }
    });

    const newQueryParams = {
      ...parsed,
      ...qp,
    };

    const queryParams = stringifyQuery(newQueryParams);

    await navigate(`?${queryParams}`, { state: { resetScroll: false } });
  };

  const getResults = () => {
    if (isLoading) {
      return [];
    }

    let result = data;

    if (findPhases.search.length > 0) {
      result = searchResults(result, findPhases.search, queryParams, index);
    }

    if (findPhases.filter.length > 0) {
      result = filterResults(result, findPhases.filter, queryParams);
    }

    if (findPhases.sort.length > 0) {
      result = sortResults(result, findPhases.sort, queryParams);
    }

    return result;
  };

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <ArchiveContext.Provider
      value={{
        getResults,
        setQueryParams,
        queryParams,
        isLoading,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

const ParamType = {
  SEARCH: 'search',
  FILTER: 'filter',
  SORT: 'sort',
  OTHER: 'other',
}

const parseQuery = (queryString) => {
  return qs.parse(queryString, { arrayFormat: 'comma' });
};

const stringifyQuery = (queryParams) => {
  return qs.stringify(queryParams, { arrayFormat: 'comma' });
};

const getParamsByType = (params, type) => {
  return params.filter((param) => param.type === type);
};

const assignDefaultValues = (params, filters) => {
  const updatedParams = { ...params };

  filters.forEach((filter) => {
    if (updatedParams[filter.id] === undefined) {
      updatedParams[filter.id] = filter.defaultValue;
    }
  });

  return updatedParams;
};

const createSearchIndex = (data, getIndexValues) => {
  const index = new Index({ tokenize: 'reverse' });

  if (data) {
    data.forEach((item, id) => {
      index.add(id, getIndexValues(item));
    });
  }

  return index;
};

const searchResults = (data, filters, params, index) => {
  const firstSearchId = filters[0].id;
  const firstSearchValue = params[firstSearchId];

  if (firstSearchValue === undefined) {
    return data;
  }

  return index.search(firstSearchValue, { records: data }).map((i) => data[i]);
};

const filterResults = (data, filters, params) => {
  return data.filter((item) => {
    return filters.every((filter) => {
      const { id, filterFn } = filter;

      if (params[id] === undefined) {
        return true;
      }

      const filterValues = Array.isArray(params[id])
        ? params[id]
        : [params[id]];

      return filterFn(item, filterValues);
    });
  });
};

const sortResults = (data, sorters, params) => {
  let results = data;

  sorters.forEach((sorter) => {
    const { id, sortFns } = sorter;

    if (params[id] === undefined) {
      return;
    }

    const sortValues = Array.isArray(params[id]) ? params[id] : [params[id]];
    sortValues.forEach((sortValue) => {
      const sortFn = sortFns[sortValue];
      if (sortFn) {
        results = sortFn(results);
      }
    });
  });

  return results;
};
