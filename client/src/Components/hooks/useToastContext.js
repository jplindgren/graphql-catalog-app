import { useContext } from 'react';
import ToastContext from '../../Contexts/ToastContextProvider';

export default function useToastContext() {
  return useContext(ToastContext);
}
