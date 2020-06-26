import React from 'react';
import { Label, Icon, Transition } from 'semantic-ui-react';

const Tag = ({ tag, onDeleteTag }) => (
  <Transition transitionOnMount duration={400} divided animation="zoom">
    <Label
      style={{ marginBottom: 10 }}
      key={tag.id}
      as="a"
      color="teal"
      size="huge"
      onClick={() => onDeleteTag(tag.id)}
    >
      {tag.name}
      <Icon name="delete" />
    </Label>
  </Transition>
);

export default Tag;
