import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/globals.scss';
import { CardList } from './CardList/CardList';
import fetchCity from '../slices/ipSlice';
import { AppDispatch } from '../slices';
import { WeatherContext } from '../contexts/index';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentWeatherId, setCurrentWeatherId] = useState(0);
  useEffect(() => {
    dispatch(fetchCity());
  }, []);
  const setId = (id: number): void => {
    setCurrentWeatherId(id);
  }
  return (
    <WeatherContext.Provider value={{
      currentWeatherId,
      setCurrentWeatherId: setId,
    }}>
      <CardList />
    </WeatherContext.Provider>
  );
}

export default App;
