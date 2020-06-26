import React from 'react';
import { Container, Grid, Rail } from 'semantic-ui-react';
import Catalog from '../Containers/Catalog';
import SidebarMenu from '../Components/SidebarMenu';

const Home = () => (
  <Container fluid>
    <Grid>
      <Grid.Row>
        <Grid.Column width="2">
          <Rail position="left">
            <SidebarMenu activeItem="home" />
          </Rail>
        </Grid.Column>
        <Grid.Column width="13">
          <Catalog />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Home;
