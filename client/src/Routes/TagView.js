import React from 'react';
import { Container, Header, Icon, Divider, Grid, Rail } from 'semantic-ui-react';
import TagList from '../Containers/TagList';
import TagForm from '../Containers/TagForm';
import BackHome from '../Components/BackHome';
import Logout from '../Components/Logout';
import SidebarMenu from '../Components/SidebarMenu';

const TagView = () => (
  <Container fluid>
    <BackHome />
    <Logout />
    <Header as="h2" icon textAlign="center">
      <Icon name="tag" circular />
      <Header.Content>Manage Tags</Header.Content>
    </Header>
    <Grid centered>
      <Grid.Row>
        <Grid.Column width="1">
          <Rail position="left">
            <SidebarMenu activeItem="tags" />
          </Rail>
        </Grid.Column>
        <Grid.Column width="8">
          <TagForm />
          <Divider />
          <TagList />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default TagView;
