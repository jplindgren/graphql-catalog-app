import React from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react';

const ItemSearch = ({
  query: { allTags = [], loading },
  handleNameChange,
  handleTagChange,
  tagsToFilter = [],
}) => {
  const handleAddTagFilter = (e, { value }) => {
    handleTagChange(value);
  };
  const handleNameToFilter = (e, { value }) => {
    handleNameChange(value);
  };

  const tagOptions = allTags.map((t) => ({
    key: t.id,
    value: t.id,
    text: t.name,
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
          floating
          labeled
          multiple
          search
          selection
          onChange={handleAddTagFilter}
          icon="tags"
          loading={loading}
          options={tagOptions}
          value={tagsToFilter}
          text="Tags.."
        />
      </Menu.Item>
    </Menu>
  );
};
export default ItemSearch;
