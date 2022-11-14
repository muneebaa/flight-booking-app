import { Button } from 'global/components';
import React from 'react';
import { BsCheckCircleFill, BsArrowRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';

function FlightConfirmation() {
  const flight = useSelector((state) => state.book.bookFlight);
  const navigate = useNavigate();

  return (
    <div className='flight-confirmation'>
      <div className='flight-confirm-check'>
        <BsCheckCircleFill />
      </div>
      <div className='flight-confirm-text'>
        <h1>Your flight has been booked successfully</h1>
        <p>
          <span>{flight.origin}</span>
          <BsArrowRight /> <span>{flight.destination}</span>
        </p>
        <Button
          value='See all your trips'
          onClick={() => navigate('/mytrips')}
        />
      </div>
    </div>
  );
}

export default FlightConfirmation;
