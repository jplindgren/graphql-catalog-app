import React from 'react';
import ItemSegment from '../Components/ItemSegment';

const Featured = ({ query }) => {
  const sectionName = 'Featured Items';
  const { data: { featuredItems = [] } = {}, loading, error } = query;
  return (
    <ItemSegment
      query={{ items: featuredItems, loading, error }}
      header={sectionName}
      icon="star"
      color="yellow"
    />
  );
};

export default Featured;
