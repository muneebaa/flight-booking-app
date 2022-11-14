import { useState, useEffect } from 'react';
import { userBookedFlight } from 'services/bookFlight';
import { BsPrinterFill } from 'react-icons/bs';
import './style.css';

function MyTrips() {
  const [allFlights, setAllFlights] = useState();
  const handleGetAllFlights = async () => {
    let response = await userBookedFlight();
    setAllFlights(response.data.flights);
  };
  useEffect(() => {
    handleGetAllFlights();
  }, []);

  return (
    <div className='mytrips-main'>
      <div className='alltickets-main'>
        {allFlights?.map((flight) => (
          <div className='ticket-main'>
            <div className='dept-company-airtime'>
              <p>3h 2min</p>
              <p>Pakistan Air Lines</p>
            </div>
            <div className='dept-company-time'>
              <p>
                {new Date(flight.depart_time).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                {new Date(flight?.depart_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
              </p>{' '}
              -
              <p>
                {new Date(flight.arrival_time).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}
                {new Date(flight?.arrival_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className='dept-stops'>
              <p>
                {flight.origin} - {flight.destination}
              </p>
            </div>
            <div className='dept-price'>
              <p>PKR {flight.total.toLocaleString('en-PK')}</p>
            </div>
            <div>
              <BsPrinterFill />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
