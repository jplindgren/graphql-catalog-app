import React from 'react';
import { Button, Rail, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const BackHome = ({ position = 'right', size = 'small', history }) => {
  const handleOnClick = () => {
    history.push('/');
  };
  return (
    <Rail internal position={position} size={size}>
      <Button icon onClick={handleOnClick}>
        <Icon name="home" />
      </Button>
    </Rail>
  );
};

export default withRouter(BackHome);
