import './App.css';
import { useEffect } from 'react';
import { Home, AllPlaces, Flights, MyTrips, BookedFlights } from './common';
import { Navigation, Footer } from './global/components';
import { Toast } from 'global/components/index';
import { Routes, Route } from 'react-router-dom';
import DepartureFlights from 'common/Flights';
import { useSelector } from 'react-redux';
import NavigationWrapper from 'global/utils/NavigationWrapper';
import CreatePlace from 'common/CreatePlace';
import CreateFlight from 'common/CreateFlight';
import CreateSeat from 'common/CreateSeat';
import ProtectedRoute from 'global/utils/ProtectedRoute';
import AdminProtectedRoute from 'global/utils/AdminProtectedRoute';
// import { useDispatch } from 'react-redux';
// import { hideHeaderFooter } from 'store/features/hideSlice';

function App() {
  // const dispatch = useDispatch();
  const hide = useSelector((state) => state.hide.hide);
  const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   console.log('useEffect');

  //   dispatch(hideHeaderFooter(false));
  // }, []);

  return (
    <div>
      <NavigationWrapper>
        <Toast />
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/places' element={<AllPlaces />} />
            {/* <Route path='/createplace' element={<CreatePlace />} />
            <Route path='/createflight' element={<CreateFlight />} />
            <Route path='/createseats' element={<CreateSeat />} /> */}
            <Route path='/mytrips' element={<MyTrips />} />
            <Route path='/:place/flight' element={<DepartureFlights />} />
          </Route>
          <Route element={<AdminProtectedRoute user={user} />}>
            <Route path='/createplace' element={<CreatePlace />} />
            <Route path='/createflight' element={<CreateFlight />} />
            <Route path='/createseats' element={<CreateSeat />} />
          </Route>
        </Routes>
        {!hide && <Footer />}
      </NavigationWrapper>
    </div>
  );
}

export default App;
