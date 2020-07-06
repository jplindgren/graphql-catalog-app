import { useContext } from 'react';
import ErrorBoundaryContext from '../../Contexts/ErrorBoundaryProvider';

export default function useErrorBoundaryContext() {
  return useContext(ErrorBoundaryContext);
}
