import React from 'react';
import { Form, TextArea, Rating, Button, Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import compose from 'lodash.flowright';
import { GET_TAGS } from '../graphql/queries/tagQueries';
import { GET_CATALOG as CATALOG, GET_ITEMS as ITEMS } from '../graphql/queries/itemQueries';
import CREATE_ITEM from '../graphql/mutations/itemMutations';
import queryInput from '../graphql/queries/helpers';
import { mutateSafe } from '../Components/hooks/useMutationSafe';
import ErrorBoundaryContext from '../Contexts/ErrorBoundaryProvider';

class ItemForm extends React.Component {
  constructor() {
    super();

    this.state = {
      item: {
        name: '',
        description: '',
        link: '',
        preview: undefined,
        rating: 0,
        favorite: false,
        tags: [],
      },
      nameError: null,
      linkError: null,
      previewError: null,
      saveLoading: false,
    };
  }

  setItemFieldState = ({ name, value }) => {
    this.setState((prev) => ({ item: { ...prev.item, [name]: value }, [`${name}Error`]: null }));
  };

  handleOnChange = (e, { name, value }) => this.setItemFieldState({ name, value });

  handleKeyDown = (e) => {
    if (e.keyCode === 27) this.setItemFieldState({ name: e.target.name, value: '' });
  };

  handleRate = (e, { rating }) => this.setItemFieldState({ name: 'rating', value: rating });

  handleFavorite = (e, { rating }) => this.setItemFieldState({ name: 'favorite', value: !!rating });

  getQuery = (query, input) => ({
    query,
    variables: input || {},
  });

  refreshQueries = (ok) => (ok ? [this.getQuery(CATALOG), this.getQuery(ITEMS, queryInput())] : []);

  handleOnSubmit = async (e) => {
    e.preventDefault();
    this.setState(
      {
        saveLoading: true,
      },
      async () => {
        const { item } = this.state;
        const { history, mutate } = this.props;
        const { graphQLErrors, authError, networkError, data } = await mutateSafe(() => {
          return mutate({
            variables: { ...item },
            refetchQueries: ({ data: { ok } }) => this.refreshQueries(ok),
          });
        });

        if (authError || networkError || graphQLErrors) {
          this.context(authError);
          this.context(networkError);
          this.context(graphQLErrors);
          return;
        }

        const { ok, errors } = data.createItem;

        if (ok) history.push('/');
        else errors.forEach(({ path, message }) => this.setState({ [`${path}Error`]: message }));

        this.setState({
          saveLoading: false,
        });
      }
    );
  };

  render() {
    const { saveLoading, nameError, linkError, previewError, item } = this.state;

    const {
      data: { allTags = [], loading },
    } = this.props;
    const options = allTags.map((t) => ({
      key: t.id,
      value: t.id,
      text: t.name,
    }));

    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Input
          label="Name"
          required
          placeholder="Name"
          fluid
          error={nameError}
          id="name"
          name="name"
          value={item.name}
          onChange={this.handleOnChange}
          loading={saveLoading}
          onKeyDown={this.handleKeyDown}
        />
        <Form.Field
          label="Description"
          placeholder="Description"
          id="description"
          name="description"
          value={item.description}
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
          control={TextArea}
        />
        <Form.Input
          label="Link"
          icon="linkify"
          iconPosition="left"
          required
          placeholder="Link"
          type="text"
          fluid
          error={linkError}
          id="link"
          name="link"
          value={item.link}
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
        />
        <Form.Input
          label="Image preview"
          icon="image"
          iconPosition="left"
          placeholder="Link to preview"
          type="url"
          error={previewError}
          fluid
          id="preview"
          name="preview"
          value={item.preview || ''}
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
        />
        <Form.Field
          control={Dropdown}
          label="Tags"
          id="tags"
          name="tags"
          selection
          multiple
          search
          options={options}
          value={item.tags}
          placeholder="Add Tags"
          onChange={this.handleOnChange}
          disabled={loading}
          loading={loading}
        />
        <Form.Field
          label="Rating"
          id="rating"
          name="rating"
          value={item.rating}
          icon="star"
          size="massive"
          maxRating={5}
          clearable
          onRate={this.handleRate}
          control={Rating}
        />
        <Form.Field
          id="favorite"
          name="favorite"
          value={item.favorite}
          icon="heart"
          size="massive"
          maxRating={1}
          clearable
          onRate={this.handleFavorite}
          control={Rating}
        />
        <Button positive type="submit">
          Save
        </Button>
      </Form>
    );
  }
}
ItemForm.contextType = ErrorBoundaryContext;

export default withRouter(compose(graphql(GET_TAGS), graphql(CREATE_ITEM))(ItemForm));
