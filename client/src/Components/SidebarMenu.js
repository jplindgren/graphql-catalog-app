import React from 'react';
import { Header, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { clearToken } from '../utils/tokens';

const SidebarMenu = ({
  history,
  activeItem,
  header = { icon: 'th', color: 'blue', text: 'Catalog' },
}) => {
  const routeMap = {
    tags: '/tags/view',
    addItem: '/items/create',
    home: '/',
  };
  const handleOnclick = (e, { name }) => {
    const route = routeMap[name];
    history.push(route);
  };

  const logout = () => {
    clearToken();
    history.push('/');
  };
  return (
    <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible width="thin">
      <Header as="h2" icon textAlign="center" dividing attached="top" color="black">
        <Icon name={header.icon} color={header.color} />
        <Header.Content>{header.text}</Header.Content>
      </Header>
      <Menu.Item name="home" as="a" onClick={handleOnclick} active={activeItem === 'home'}>
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item name="addItem" as="a" onClick={handleOnclick} active={activeItem === 'addItem'}>
        <Icon name="add circle" />
        Add Item
      </Menu.Item>
      <Menu.Item name="tags" as="a" onClick={handleOnclick} active={activeItem === 'tags'}>
        <Icon name="tags" />
        Tags
      </Menu.Item>
      <Menu.Item name="logout" as="a" onClick={logout}>
        <Icon name="power off" size="tiny" inverted />
        Logout
      </Menu.Item>
    </Sidebar>
  );
};

export default withRouter(SidebarMenu);
