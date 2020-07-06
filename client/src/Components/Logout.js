import React from 'react';
import { Button, Rail, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { clearToken } from '../utils/tokens';

const Logout = ({ position = 'right', size = 'small', history }) => {
  const handleOnClick = () => {
    clearToken();
    history.push('/');
  };
  return (
    <Rail internal position={position} size={size}>
      <Button icon onClick={handleOnClick}>
        <Icon name="log out" />
      </Button>
    </Rail>
  );
};

export default withRouter(Logout);
