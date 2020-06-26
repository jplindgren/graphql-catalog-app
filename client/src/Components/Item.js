import React from 'react';
import { Card, Rating, Image, Label } from 'semantic-ui-react';

const Item = ({ item }) => {
  const hasPreview = !!item.preview;
  return (
    <Card href={item.link} target="_blank" color={item.favorite ? 'red' : null}>
      {hasPreview && <Image wrapped ui src={item.preview} />}
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
        {!hasPreview && <Card.Description>{item.description}</Card.Description>}
      </Card.Content>
      {item.tags && (
        <Card.Content extra>
          <Label.Group size="small">
            {item.tags.map((t) => (
              <Label key={t.id}>{t.name}</Label>
            ))}
          </Label.Group>
        </Card.Content>
      )}
      <Card.Content extra>
        <Rating defaultRating={item.rating} maxRating={5} disabled />
        {item.favorite && (
          <Label
            color="red"
            attached="bottom right"
            icon={{ size: 'large', name: 'heart', fitted: true }}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default Item;
