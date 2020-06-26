import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TAG } from '../graphql/mutations/tagMutations';
import { GET_TAGS } from '../graphql/queries/tagQueries';

const TagDelete = ({ children }) => {
  const [deleteTagMutation, { loading }] = useMutation(DELETE_TAG);

  const handleDeleteTag = async (tagId) => {
    deleteTagMutation({
      variables: { id: tagId },
      refetchQueries: [{ query: GET_TAGS }],
    });
  };

  return React.cloneElement(children, { onDeleteTag: handleDeleteTag, loading });
};

export default TagDelete;
