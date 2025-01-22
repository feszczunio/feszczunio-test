import React, { useCallback, useState } from 'react';
import { InputField } from '../layout/searchbar/InputField';
import { SearchCheckbox } from '../layout/searchbar/SearchCheckbox';
import { useArchiveContext } from '../../contexts/ArchiveContext';
import { useStatikPageContext } from '@statik-space/gatsby-theme-statik/src/hooks';
import { Sorting, Param } from '../../utils/consts';
import { debounce } from 'lodash';

export const PostsArchiveFilters = () => {
  const { setQueryParams, queryParams } = useArchiveContext();
  const { pageContext: ctx } = useStatikPageContext();
  const sortBy = queryParams[Param.SORT_BY];
  const sortersFromURL = Array.isArray(sortBy)
    ? sortBy
    : sortBy
    ? [sortBy]
    : [];

  const [searchValue, setSearchValue] = useState(queryParams[Param.QUERY] || '')

  const search = async (value) => {
    await setQueryParams({ [Param.QUERY]: value });
  };
  const debouncedSearch = useCallback(debounce(search, 300), []);
  const handleSearch = async (e) => {
    const value = e.target.value.length === 0 ? undefined : e.target.value;
    setSearchValue(value)
    await debouncedSearch(value)
  }

  const hasFilter = (filterType, filterValue) => {
    return queryParams[filterType]?.includes(filterValue) || false;
  };

  const toggleFilter = (filterType, filterValue) => {
    let items = Array.isArray(queryParams[filterType])
      ? queryParams[filterType]
      : queryParams[filterType]
      ? [queryParams[filterType]]
      : [];

    if (items.includes(filterValue)) {
      return [...items.filter((item) => filterValue !== item)];
    } else {
      return [...items, filterValue];
    }
  };

  const updateSorter = (sorterValue, sortersToRemove) => {
    const updatedSorters = sortersFromURL.filter(
      (s) => !sortersToRemove.includes(s),
    );
    if (sorterValue !== Sorting.DEFAULT) {
      updatedSorters.push(sorterValue);
    }
    setQueryParams({ [Param.SORT_BY]: updatedSorters });
  };

  return (
    <section className="archive-search">
      <InputField value={searchValue} onChange={handleSearch} />

      <section className="archive-search__params">
        <div className="archive-search__sort">
          <p>Sort by</p>
          <select
            className="archive-search__select"
            value={
              sortersFromURL.find((s) =>
                [Sorting.DATE_DESC, Sorting.DATE_ASC].includes(s),
              ) || Sorting.DEFAULT
            }
            onChange={(e) =>
              updateSorter(e.target.value, [
                Sorting.DATE_DESC,
                Sorting.DATE_ASC,
              ])
            }
          >
            <option value={Sorting.DEFAULT}>Default</option>
            <option value={Sorting.DATE_DESC}>Date descending</option>
            <option value={Sorting.DATE_ASC}>Date ascending</option>
          </select>
          <select
            className="archive-search__select"
            value={
              sortersFromURL.find((s) =>
                [Sorting.TITLE_DESC, Sorting.TITLE_ASC].includes(s),
              ) || Sorting.DEFAULT
            }
            onChange={(e) =>
              updateSorter(e.target.value, [
                Sorting.TITLE_DESC,
                Sorting.TITLE_ASC,
              ])
            }
          >
            <option value={Sorting.DEFAULT}>Default</option>
            <option value={Sorting.TITLE_DESC}>Title descending</option>
            <option value={Sorting.TITLE_ASC}>Title ascending</option>
          </select>

          <p>Elements per page</p>
          <select
            className="archive-search__select"
            value={queryParams[Param.PER_PAGE] || 'default'}
            onChange={(e) => {
              const selectedValue =
                e.target.value === 'default' ? undefined : e.target.value;
              setQueryParams({
                [Param.PER_PAGE]: selectedValue,
                [Param.PAGE]: undefined,
              });
            }}
          >
            <option value="default">Default</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="archive-search__categories">
          <p>Categories</p>
          {ctx.allCategories.map((category, index) => {
            return (
              <SearchCheckbox
                key={index}
                label={category.name}
                isChecked={hasFilter(Param.CATEGORIES, category.slug)}
                onChange={async () => {
                  await setQueryParams({
                    [Param.CATEGORIES]: toggleFilter(
                      Param.CATEGORIES,
                      category.slug,
                    ),
                    [Param.PAGE]: undefined,
                  });
                }}
              />
            );
          })}
        </div>
        <div className="archive-search__authors">
          <p>Authors</p>
          {ctx.allAuthors.map((author, index) => {
            return (
              <SearchCheckbox
                key={index}
                label={author.name}
                isChecked={hasFilter(Param.AUTHORS, author.slug)}
                onChange={async () => {
                  await setQueryParams({
                    [Param.AUTHORS]: toggleFilter(Param.AUTHORS, author.slug),
                    [Param.PAGE]: undefined,
                  });
                }}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
};
