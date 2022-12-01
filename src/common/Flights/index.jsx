import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaceFlight } from 'services/places/index';
import { Button, CardBorder } from 'global/components';
import { Stepper, Step } from 'react-form-stepper';
import { createBookFlight } from 'store/features/bookFlight';
import moment from 'moment';

import './style.css';
import PassengerForm from 'common/PassengerForm';
import { useDispatch, useSelector } from 'react-redux';
import Seats from 'common/Seats';
import PaymentInfo from 'common/PaymentInfo';
import FlightConfirmation from 'common/FlightConfirmation';

function Flights() {
  const { place } = useParams();
  const [allFlights, setAllFlights] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [tax, setTax] = useState(6742);
  const [goSteps, setGoSteps] = useState(0); // for stepper
  const dispatch = useDispatch();
  const hide = useSelector((state) => state.hide.hide);

  const handleGetAllFlights = async () => {
    // dispatch(setLoading());
    let response = await getPlaceFlight(place);
    setAllFlights(response.data.flights);
    // dispatch(setLoadingFinished());
  };
  useEffect(() => {
    handleGetAllFlights();
  }, []);

  const handlePassangerClick = () => {
    const payload = {
      flight: selectedFlight._id,
      depart_time: selectedFlight.depart_time,
      arrival_time: selectedFlight.arrival_time,
      subtotal: selectedFlight.price,
      origin: selectedFlight.origin,
      destination: selectedFlight.destination,
      company: selectedFlight.company,
      tax: tax,
    };
    dispatch(createBookFlight(payload));
    setGoSteps(1);
  };

  function calc_time(dt2, dt1) {
    const start = moment(dt2);
    const end = moment(dt1);
    const duration = moment.duration(end.diff(start));
    const hours = duration.hours();
    const minutes = duration.minutes();
    console.log(hours);
    return `${hours}h ${minutes}min`;
  }

  return (
    <>
      <div className='departure-flights-main' style={{ padding: hide && 0 }}>
        <div>
          {goSteps === 0 && (
            <p className='choose-dept-flight-text'>
              Choose a <span className='main-span'>departing</span> flight
            </p>
          )}

          <div className='flex-between'>
            {goSteps === 0 && (
              <div className='all-dept-flights-main'>
                {allFlights?.map((flight) => (
                  <div
                    className='dept-flight-single'
                    onClick={() => setSelectedFlight(flight)}>
                    <div className='dept-company-airtime'>
                      <p>
                        {calc_time(
                          new Date(flight?.depart_time),
                          new Date(flight?.arrival_time)
                        )}
                      </p>
                      <p>{flight.company}</p>
                    </div>
                    <div className='dept-company-time'>
                      <p>
                        {new Date(flight.depart_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {new Date(flight.arrival_time).toLocaleTimeString([], {
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
                      <p>PKR {flight.price.toLocaleString('en-PK')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {goSteps === 1 && <PassengerForm setGoSteps={setGoSteps} />}
            {goSteps === 2 && <Seats setGoSteps={setGoSteps} />}
            {goSteps === 3 && <PaymentInfo setGoSteps={setGoSteps} />}
            {goSteps === 4 && <FlightConfirmation />}
            {selectedFlight && (
              <>
                {goSteps === 0 || goSteps === 1 || goSteps === 3 ? (
                  <div className='selected-flight-main'>
                    <>
                      <CardBorder>
                        <div className='flex-between'>
                          <div className='selected-flight-company'>
                            <h2>{selectedFlight?.company}</h2>
                            <p>
                              {selectedFlight.origin} -{' '}
                              {selectedFlight.destination}
                            </p>
                          </div>
                          <div className='selected-flight-times'>
                            <p>
                              {calc_time(
                                new Date(selectedFlight?.depart_time),
                                new Date(selectedFlight?.arrival_time)
                              )}
                            </p>

                            <p>
                              {new Date(
                                selectedFlight.depart_time
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}{' '}
                              -{' '}
                              {new Date(
                                selectedFlight.arrival_time
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </CardBorder>
                      <div className='selected-flight-button'>
                        <p>
                          Subtotal PKR{' '}
                          {selectedFlight.price.toLocaleString('en-PK')}
                        </p>
                        <p>Taxes and Fees PKR {tax}</p>
                        <p>
                          Total PKR{' '}
                          {(Number(selectedFlight.price) + tax).toLocaleString(
                            'en-PK'
                          )}
                        </p>
                        {goSteps === 0 && (
                          <Button
                            onClick={() => handlePassangerClick()}
                            value='Passenger Information'
                          />
                        )}{' '}
                        {goSteps === 1 && (
                          <Button
                            onClick={() => setGoSteps(2)}
                            value='Select Seats'
                          />
                        )}
                        {goSteps === 3 && (
                          <Button
                            onClick={() => setGoSteps(4)}
                            value='Confirm and Pay'
                          />
                        )}
                      </div>
                      {goSteps === 1 && (
                        <div className='bags-image'>
                          <img
                            src={require('../../images/bags.png')}
                            alt='bags'
                          />
                        </div>
                      )}
                    </>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      {!hide && (
        <Stepper
          activeStep={goSteps}
          styleConfig={{
            activeBgColor: '#5351ff',
            // activeTextColor: '#FFFFFF',
            // inactiveBgColor: '#FFFFFF',
            inactiveTextColor: '#605DEC',
            completedBgColor: '#abaaff',
            // completedTextColor: '#09BC8A',
            size: '1.5em',
          }}
          className='stepper'
          stepClassName='stepper__step'>
          <Step onClick={() => setGoSteps(0)} label='Select Flight' />
          <Step onClick={() => setGoSteps(1)} label='Passenger Information' />
          <Step onClick={() => setGoSteps(2)} label='Book Seats' />
          <Step onClick={() => setGoSteps(3)} label='Payment Information' />
          <Step onClick={() => setGoSteps(4)} label='Confirmation' />
        </Stepper>
      )}
    </>
  );
}

export default Flights;
