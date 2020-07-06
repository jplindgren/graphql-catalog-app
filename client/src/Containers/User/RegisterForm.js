import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { REGISTER_USER } from '../../graphql/mutations/userMutation';

const RegisterForm = () => {
  const [data, setData] = useState({});
  const [formErrors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register] = useMutation(REGISTER_USER);

  const history = useHistory();

  const handleOnChange = (e, { name, value }) => {
    setData({ ...data, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleKeyDown = (e) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: null }));
    if (e.keyCode === 27) setData((prev) => ({ ...prev, [name]: '' }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { password } = data;
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Password does not match...' }));
      return;
    }

    const response = await register({
      variables: data,
    });
    const { ok, errors } = response.data.registerUser;

    if (ok) history.push('/');
    else errors.forEach(({ path, message }) => setErrors((prev) => ({ ...prev, [path]: message })));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Input
        label="email"
        required
        placeholder="Email"
        fluid
        error={formErrors.email}
        id="email"
        name="email"
        value={data.email || ''}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Form.Input
        label="name"
        placeholder="Your name"
        fluid
        id="name"
        name="name"
        error={formErrors.name}
        value={data.name || ''}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Form.Input
        label="password"
        icon="lock"
        iconPosition="left"
        required
        placeholder="Password"
        type="password"
        fluid
        error={formErrors.password}
        id="password"
        name="password"
        value={data.password || ''}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Form.Input
        label="confirmPassword"
        icon="lock"
        required
        iconPosition="left"
        placeholder="Confirm password"
        type="password"
        error={formErrors.confirmPassword}
        fluid
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword || ''}
        onChange={(_, { value }) => setConfirmPassword(value)}
      />
      <Button positive type="submit">
        Save
      </Button>
    </Form>
  );
};

export default RegisterForm;
