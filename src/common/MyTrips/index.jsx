import { useState, useEffect } from 'react';
import { userBookedFlight } from 'services/bookFlight';
import { BsPrinterFill } from 'react-icons/bs';
import PDFFile from '../../global/components/PDF/index';
import { deleteBookedFlight } from 'services/bookFlight';
import { updateSeat } from 'services/seats';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import './style.css';

function MyTrips() {
  const [allFlights, setAllFlights] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
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
          <div className='ticket-single'>
            <div className='ticket-time'>
              <h2>
                {new Date(flight.depart_time).toLocaleDateString('en-us', {
                  weekday: 'long',
                })}
              </h2>
              <p>
                {new Date(flight.depart_time).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className='ticket-place'>
              <p>
                {flight.origin} - {flight.destination}
              </p>
              <p>{flight.company}</p>
            </div>
            <div className='ticket-id'>
              <p>{flight._id}</p>
            </div>
            <div className='ticket-confirm'>
              <p>Confirmed</p>
              <p>
                Booked on{' '}
                {new Date(flight.createdAt).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className='ticket-print'>
              <PDFDownloadLink
                document={<PDFFile flight={flight} />}
                filename='FORM'>
                {({ loading }) =>
                  loading ? (
                    <button>Loading Document...</button>
                  ) : (
                    <BsPrinterFill />
                  )
                }
              </PDFDownloadLink>
            </div>
            {/* <div className='ticket-cancel'>
              <button onClick={() => handleClick(flight)}>Cancel</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
