import { useContext } from 'react';
import { AddressContext } from '../contexts/AddressContext';

export default function useAddress() {
  return useContext(AddressContext);
}
