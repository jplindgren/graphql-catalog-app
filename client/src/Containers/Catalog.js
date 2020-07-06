import React, { useState, useEffect, useCallback } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import useDebounce from '../Components/hooks/useDebounce';
import Featured from './Featured';
import Favorites from './Favorites';
import ItemList from './ItemList';
import { GET_ITEMS, GET_CATALOG } from '../graphql/queries/itemQueries';
import getItemsQueryInput from '../graphql/queries/helpers';
import { hasAuthError } from '../utils/errorHandler';
import ErrorScreen from '../Components/Error/ErrorScreen';
import Loading from '../Components/Loading';

const Catalog = () => {
  const [inMemoryTags, setInMemoryTags] = useState([]);
  const [tagsToFilter, setTagsToFilter] = useState([]);
  const [nameToFilter, setNameToFilter] = useState(null);

  const debouncedSearchTerm = useDebounce(nameToFilter, 300);

  const { data, loading, error: { graphQLErrors, networkError } = {} } = useQuery(GET_CATALOG);
  const [getItems, { data: itemsData, loading: itemsLoading, error: itemsError }] = useLazyQuery(
    GET_ITEMS,
    {
      variables: getItemsQueryInput(debouncedSearchTerm, tagsToFilter),
    }
  );

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 0) getItems();
  }, [debouncedSearchTerm, getItems]);

  useEffect(() => {
    const { allTags = [] } = data || {};
    setInMemoryTags(allTags);
    getItems();
  }, [getItems, data]);

  const handleNameChange = useCallback((value) => setNameToFilter(value), [setNameToFilter]);

  const handleTagChange = useCallback((value) => setTagsToFilter(value), [setTagsToFilter]);

  if (loading) return <Loading />;
  if (hasAuthError(graphQLErrors)) return <Redirect to="/login" />;
  if (networkError) return <Redirect to="/error" />;
  if (graphQLErrors) return <ErrorScreen />;
  console.log('ITEMS', itemsData);
  return (
    <div>
      <Featured query={{ data, loading }} />
      <Favorites query={{ data, loading }} />
      <ItemList
        handleNameChange={handleNameChange}
        handleTagChange={handleTagChange}
        tagsToFilter={tagsToFilter}
        query={{ ...{ data: { ...itemsData, allTags: inMemoryTags } }, itemsLoading, itemsError }}
      />
    </div>
  );
};

export default Catalog;
