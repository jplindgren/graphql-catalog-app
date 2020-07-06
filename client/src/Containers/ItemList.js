import React, { useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import ItemSegment from '../Components/ItemSegment';
import ItemSearch from './ItemSearch';

const ItemList = ({ query, handleNameChange, handleTagChange, tagsToFilter }) => {
  const header = 'All Items';
  const { data: { allItems = [], allTags = [] } = {}, loading, error } = query;
  const [viewFormat, setViewFormat] = useState('list');

  const onChangeFormat = (e, { value }) => {
    e.stopPropagation();
    setViewFormat(value);
  };

  return (
    <div>
      <Header textAlign="center">
        <Icon name="list" circular />
        {header}
      </Header>

      <ItemSearch
        query={{ allTags, loading, error }}
        handleNameChange={handleNameChange}
        handleTagChange={handleTagChange}
        tagsToFilter={tagsToFilter}
        handleChangeFormat={onChangeFormat}
      />
      <ItemSegment query={{ items: allItems, loading, error }} viewFormat={viewFormat} />
    </div>
  );
};

export default ItemList;
