import React from 'react';
import { Table, Label, Rating, Card, Icon } from 'semantic-ui-react';

const ItemTable = ({ items = [] }) => (
  <Table celled padded striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={2}>Open</Table.HeaderCell>
        <Table.HeaderCell width={4}>Name</Table.HeaderCell>
        <Table.HeaderCell width={1}>Rating</Table.HeaderCell>
        <Table.HeaderCell width={3}>Tags</Table.HeaderCell>
        <Table.HeaderCell width={4}>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {items.map((item) => (
        <Table.Row>
          <Table.Cell>
            <Card href={item.link} target="_blank" raised fluid>
              <Card.Content textAlign="center">
                {item.favorite && <Label corner="left" color="red" icon="heart" />}
                <Icon size="large" name="arrow alternate circle right" />
              </Card.Content>
            </Card>
          </Table.Cell>
          <Table.Cell singleLine>{item.name}</Table.Cell>
          <Table.Cell>
            <Rating defaultRating={item.rating} maxRating={5} disabled />
          </Table.Cell>
          <Table.Cell>
            {item.tags && (
              <Label.Group size="small">
                {item.tags.map((t) => (
                  <Label key={t.id}>{t.name}</Label>
                ))}
              </Label.Group>
            )}
          </Table.Cell>
          <Table.Cell singleLine>{item.description}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default ItemTable;
