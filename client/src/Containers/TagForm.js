import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import useMutationSafe from '../Components/hooks/useMutationSafe';
import useToastContext from '../Components/hooks/useToastContext';
import useErrorBoundaryContext from '../Components/hooks/useErrorBoundaryContext';
import { GET_TAGS } from '../graphql/queries/tagQueries';
import { CREATE_TAG } from '../graphql/mutations/tagMutations';

function TagForm() {
  const [tagName, setTagName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [tagCreationLoading, setTagCreationLoading] = useState(false);

  const addToast = useToastContext();
  const addError = useErrorBoundaryContext();

  const [createTag] = useMutationSafe(CREATE_TAG);

  const handleOnChange = (e, { value }) => {
    setTagName(value);
    setNameError(null);
  };

  const resetInitialState = () => {
    setTagName('');
    setNameError(null);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      resetInitialState();
    }
  };

  const handleOnSubmit = async (evt) => {
    setTagCreationLoading(true);
    evt.preventDefault();

    const response = await createTag({
      variables: { tagName },
      refetchQueries: [{ query: GET_TAGS }],
    });

    setTagCreationLoading(false);
    const { graphQLErrors, authError, networkError, data } = response;

    if (authError || networkError) {
      addError(authError);
      addError(networkError);
      return;
    }

    if (graphQLErrors) {
      graphQLErrors.forEach((e) => addToast({ operation: 'negative', message: e.message }));
      return;
    }

    const { ok, errors } = data.createTag;

    if (!ok) {
      // form errors
      errors.forEach(({ message }) => setNameError(message));
      return;
    }

    resetInitialState();
    addToast({ operation: 'success', message: 'Tag created with success' });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Input
        fluid
        icon="tag"
        iconPosition="left"
        size="huge"
        error={nameError}
        id="tagName"
        name="tagName"
        value={tagName}
        onChange={handleOnChange}
        loading={tagCreationLoading}
        onKeyDown={handleKeyDown}
      />
    </Form>
  );
}

export default TagForm;
