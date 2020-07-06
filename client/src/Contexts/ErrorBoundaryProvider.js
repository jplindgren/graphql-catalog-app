import React, { useCallback, useState, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import { hasAuthError } from '../utils/errorHandler';
import ErrorScreen from '../Components/Error/ErrorScreen';

const ErrorsContext = createContext();

export default ErrorsContext;

export function ErrorBoundaryProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = useCallback(
    (error) => {
      if (error) setErrors((prevErrors) => [...prevErrors, error]);
    },
    [setErrors]
  );

  const getComponent = () => {
    if (!errors || errors.length === 0) return children;

    if (hasAuthError(errors)) return <Redirect to="/login" />;

    return <ErrorScreen />;
  };

  return <ErrorsContext.Provider value={addError}>{getComponent()}</ErrorsContext.Provider>;
}
