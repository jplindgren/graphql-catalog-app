import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const ErrorScreen = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="times circle outline" color="red" />
      <Header.Content>Ops something wrong happened</Header.Content>
      <Header.Subheader>
        {` Your error Id: ${new Date().getUTCMilliseconds()} was recorded in our database and will be tracked ASAP. Meanwhile try to refresh the page.`}
      </Header.Subheader>
    </Header>
  </div>
);

export default ErrorScreen;
