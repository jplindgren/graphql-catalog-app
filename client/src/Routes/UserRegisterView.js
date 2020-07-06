import React from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import RegisterForm from '../Containers/User/RegisterForm';
import BackHome from '../Components/BackHome';

const UserRegisterView = () => (
  <Container>
    <BackHome />
    <Header as="h2" icon textAlign="center">
      <Icon name="add" circular />
      <Header.Content>Register User</Header.Content>
    </Header>
    <Grid centered>
      <Grid.Row>
        <Grid.Column width="10">
          <RegisterForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default UserRegisterView;
