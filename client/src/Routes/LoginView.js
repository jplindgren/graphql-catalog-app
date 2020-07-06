import React from 'react';
import { Container, Header, Grid, Icon } from 'semantic-ui-react';
import Login from '../Containers/User/Login';
import BackHome from '../Components/BackHome';

const LoginView = () => (
  <Container>
    <BackHome />
    <Header as="h2" icon textAlign="center">
      <Icon name="arrow alternate circle right" circular />
      <Header.Content>Login</Header.Content>
    </Header>
    <Grid centered>
      <Grid.Row>
        <Grid.Column width="10">
          <Login />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default LoginView;
