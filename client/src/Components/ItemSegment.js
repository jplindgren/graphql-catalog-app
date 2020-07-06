import React, { useState } from 'react';
import { Segment, Header, Card, Icon, Rail, Button, Transition } from 'semantic-ui-react';
import Item from './Item';
import ItemTable from './ItemTable';

const ItemSegment = ({
  query: { items = [], loading },
  header,
  color = null,
  raised = false,
  icon = null,
  viewFormat = 'card',
}) => {
  const [visible, setVisible] = useState(true);
  const handleVisibiltyToggleClick = () => {
    setVisible(!visible);
  };

  const viewComponent = () => {
    if (viewFormat === 'card') {
      return (
        <Segment.Inline>
          <Card.Group itemsPerRow={6}>
            {items.map((i) => (
              <Item key={i.id} item={i} />
            ))}
          </Card.Group>
        </Segment.Inline>
      );
    }
    return <ItemTable items={items} />;
  };
  return (
    <Segment color={color} raised={raised} loading={loading}>
      {header && (
        <Header textAlign="center">
          {icon && <Icon name={icon} circular />}
          {header}
        </Header>
      )}
      <Rail internal position="left">
        <Button icon onClick={handleVisibiltyToggleClick} size="mini">
          <Icon name={visible ? 'chevron up' : 'chevron down'} />
        </Button>
      </Rail>
      <Transition transitionOnMount duration={400} divided animation="zoom" visible={visible}>
        {viewComponent()}
      </Transition>
    </Segment>
  );
};

export default ItemSegment;
