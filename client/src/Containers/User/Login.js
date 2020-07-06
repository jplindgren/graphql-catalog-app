import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { LOGIN } from '../../graphql/mutations/userMutation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataErrors, setErrors] = useState({});

  const history = useHistory();

  const handleEmailOnChange = (e, { value }) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: null }));
  };
  const handleEmailOnPasssword = (e, { value }) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: null }));
  };

  const [login] = useMutation(LOGIN);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      variables: { email, password },
    });
    const { ok, token, refreshToken, errors } = result.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    } else {
      errors.forEach(({ path, message }) => setErrors((prev) => ({ ...prev, [path]: message })));
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Input
        label="email"
        required
        placeholder="Email"
        fluid
        error={dataErrors.email}
        id="email"
        name="email"
        value={email}
        onChange={handleEmailOnChange}
      />
      <Form.Input
        label="password"
        icon="lock"
        iconPosition="left"
        required
        placeholder="Password"
        type="password"
        fluid
        error={dataErrors.password}
        id="password"
        name="password"
        value={password}
        onChange={handleEmailOnPasssword}
      />
      <Button.Group attached="bottom">
        <Button positive size="large" type="submit">
          Login
        </Button>
        <Button
          type="button"
          size="large"
          value="/register"
          onClick={(e, { value }) => history.push(value)}
        >
          Register
        </Button>
      </Button.Group>
    </Form>
  );
};

export default Login;
