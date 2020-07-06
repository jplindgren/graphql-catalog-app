import React from 'react';
import { Menu, Input, Dropdown, Button, Icon } from 'semantic-ui-react';

const ItemSearch = ({
  query: { allTags = [], loading },
  handleNameChange,
  handleTagChange,
  tagsToFilter = [],
  handleChangeFormat,
}) => {
  const handleAddTagFilter = (e, { value }) => {
    handleTagChange(value);
  };
  const handleNameToFilter = (e, { value }) => {
    handleNameChange(value);
  };

  const tagOptions = allTags.map((tag) => ({
    key: tag.id,
    value: tag.id,
    text: tag.name,
  }));

  return (
    <Menu>
      <Menu.Item>
        <Input
          className="icon"
          icon="search"
          placeholder="Search..."
          onChange={handleNameToFilter}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          button
          className="icon"
          labeled
          multiple
          search
          selection
          additionPosition="bottom"
          fluid
          onChange={handleAddTagFilter}
          icon="tags"
          loading={loading}
          options={tagOptions}
          value={tagsToFilter}
        />
      </Menu.Item>
      <Menu.Item position="right">
        <Button.Group icon>
          <Button onClick={handleChangeFormat} value="card">
            <Icon name="grid layout" />
          </Button>
          <Button onClick={handleChangeFormat} value="list">
            <Icon name="list layout" />
          </Button>
        </Button.Group>
      </Menu.Item>
    </Menu>
  );
};
export default ItemSearch;
