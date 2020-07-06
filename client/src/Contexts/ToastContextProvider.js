import React, { useCallback, useEffect, useState, createContext } from 'react';
import { Message, Grid, Container, Transition } from 'semantic-ui-react';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts((prevToasts) => prevToasts.slice(1)), 2000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    ({ operation, message = 'negative' }) => {
      setToasts((prevToasts) => [...prevToasts, { operation, message }]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      <div>
        <Container fluid>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width="1"></Grid.Column>
              <Grid.Column width="8">
                <Transition.Group animation="slide down" duration={300}>
                  {toasts.map(({ operation, message }) => (
                    <Message
                      floating
                      key={message}
                      negative={operation === 'negative'}
                      success={operation === 'success'}
                      warning={operation === 'warning'}
                    >
                      {message}
                    </Message>
                  ))}
                </Transition.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {children}
      </div>
    </ToastContext.Provider>
  );
}
