import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { GET_TAGS } from '../graphql/queries/tagQueries';
import { CREATE_TAG } from '../graphql/mutations/tagMutations';

function TagForm() {
  const [tagName, setTagName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [tagCreationLoading, setTagCreationLoading] = useState(false);

  const [createTag] = useMutation(CREATE_TAG);

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

  const handleOnSubmit = async (e) => {
    setTagCreationLoading(true);
    e.preventDefault();
    const response = await createTag({
      variables: { tagName },
      refetchQueries: [{ query: GET_TAGS }],
    });
    const { ok, errors } = response.data.createTag;

    if (ok) resetInitialState();
    else errors.forEach(({ message }) => setNameError(message));

    setTagCreationLoading(false);
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
