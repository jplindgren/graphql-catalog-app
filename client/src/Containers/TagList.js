import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import Tag from '../Components/Tag';
import ErrorScreen from '../Components/Error/ErrorScreen';
import TagDelete from './TagDelete';
import { GET_TAGS } from '../graphql/queries/tagQueries';
import { hasAuthError } from '../utils/errorHandler';

const TagList = () => {
  const { data, loading, error: { graphQLErrors, networkError } = {} } = useQuery(GET_TAGS);

  if (loading) return <Loading />;
  if (hasAuthError(graphQLErrors)) return <Redirect to="/login" />;
  if (networkError) return <Redirect to="/error" />;
  if (graphQLErrors) return <ErrorScreen />;

  return (
    <div>
      {data.allTags &&
        data.allTags.map((tag) => (
          <TagDelete key={tag.id}>
            <Tag tag={tag} />
          </TagDelete>
        ))}
    </div>
  );
};

export default TagList;
