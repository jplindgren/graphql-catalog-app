import React from 'react';
import { DELETE_TAG } from '../graphql/mutations/tagMutations';
import { GET_TAGS } from '../graphql/queries/tagQueries';
import useMutationSafe from '../Components/hooks/useMutationSafe';
import useToastContext from '../Components/hooks/useToastContext';
import useErrorBoundaryContext from '../Components/hooks/useErrorBoundaryContext';

const TagDelete = ({ children }) => {
  const [deleteTagMutation, { loading }] = useMutationSafe(DELETE_TAG);
  const addToast = useToastContext();
  const addError = useErrorBoundaryContext();

  const handleDeleteTag = async (tagId) => {
    const { graphQLErrors, authError, networkError } = deleteTagMutation({
      variables: { id: tagId },
      refetchQueries: [{ query: GET_TAGS }],
    });

    if (authError || networkError) {
      addError(authError);
      addError(networkError);
      return;
    }

    if (graphQLErrors) {
      graphQLErrors.forEach((e) => addToast({ operation: 'negative', message: e.message }));
    }
  };

  return React.cloneElement(children, { onDeleteTag: handleDeleteTag, loading });
};

export default TagDelete;
