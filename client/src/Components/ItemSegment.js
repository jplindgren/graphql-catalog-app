import React, { useState } from 'react';
import { Segment, Header, Card, Icon, Rail, Button, Transition } from 'semantic-ui-react';
import Item from './Item';

//TODO error
const ItemSegment = ({
  query: { items = [], loading, error },
  header,
  color = null,
  raised = false,
  icon = null,
}) => {
  const [visible, setVisible] = useState(true);
  const handleVisibiltyToggleClick = () => {
    setVisible(!visible);
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
        <Segment.Inline>
          <Card.Group itemsPerRow={6}>
            {items.map((i) => (
              <Item key={i.id} item={i} />
            ))}
          </Card.Group>
        </Segment.Inline>
      </Transition>
    </Segment>
  );
};

export default ItemSegment;
