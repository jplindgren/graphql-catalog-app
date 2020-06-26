import React from 'react';
import ItemSegment from '../Components/ItemSegment';

const Favorites = ({ query }) => {
  const sectionName = 'Favorites';
  const { data: { favorites = [] } = {}, loading, error } = query;
  return (
    <ItemSegment
      query={{ items: favorites, loading, error }}
      header={sectionName}
      raised
      color="red"
      icon="heart"
    />
  );
};

export default Favorites;
