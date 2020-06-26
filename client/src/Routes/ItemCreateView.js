import React from 'react';
import { Container, Grid, Rail, Header, Icon } from 'semantic-ui-react';
import ItemForm from '../Containers/ItemForm';
import SidebarMenu from '../Components/SidebarMenu';
import BackHome from '../Components/BackHome';

const ItemCreateView = () => (
  <Container>
    <BackHome />
    <Header as="h2" icon textAlign="center">
      <Icon name="add" circular />
      <Header.Content>Create Item</Header.Content>
    </Header>
    <Grid centered>
      <Grid.Row>
        <Grid.Column width="1">
          <Rail position="left">
            <SidebarMenu activeItem="addItem" />
          </Rail>
        </Grid.Column>
        <Grid.Column width="8">
          <ItemForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default ItemCreateView;
