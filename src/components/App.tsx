import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/globals.scss';
import { CardList } from './CardList/CardList';
import fetchCity from '../slices/ipSlice';
import { AppDispatch } from '../slices';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCity());
  }, []);
  return <CardList />;
}

export default App;
