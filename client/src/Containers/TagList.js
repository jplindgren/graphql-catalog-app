import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Components/Loading';
import Tag from '../Components/Tag';
import TagDelete from './TagDelete';
import { GET_TAGS } from '../graphql/queries/tagQueries';

const TagList = () => {
  const { data, loading, error } = useQuery(GET_TAGS);
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
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
