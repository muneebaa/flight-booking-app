import './App.css';
import { Home, AllPlaces, Flights, MyTrips, BookedFlights } from './common';
import { Navigation, Footer } from './global/components';
import { Toast } from 'global/components/index';
import { Routes, Route } from 'react-router-dom';
import DepartureFlights from 'common/Flights';
import { useSelector } from 'react-redux';

function App() {
  const hide = useSelector((state) => state.hide.hide);
  return (
    <div>
      <Toast />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/places' element={<AllPlaces />} />
        <Route path='/mytrips' element={<MyTrips />} />
        <Route path='/:place/flight' element={<DepartureFlights />} />
        <Route path='/set' element={<BookedFlights />} />
      </Routes>
      {!hide && <Footer />}
    </div>
  );
}

export default App;
