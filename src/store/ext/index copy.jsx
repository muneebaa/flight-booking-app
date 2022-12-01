import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './style.css';
import { Button } from '../../global/components';
import { getAllSeats } from 'services/seats/index';
import { hideHeaderFooter } from 'store/features/hideSlice';
import { useDispatch } from 'react-redux';
import { createBookFlight } from 'store/features/bookFlight';
import planeImage from '../../images/plane.png';

function Seats({ setGoSteps }) {
  const [checkedList, setCheckedList] = useState();
  const [selectedSeat, setSelectedSeat] = useState();
  const [economy, setEconomy] = useState();
  const [business, setBusiness] = useState();
  const flight = useSelector((state) => state.book.bookFlight);
  const prevData = useSelector((state) => state.book.bookFlight);

  const dispatch = useDispatch();

  const twoDarray = (arr, totalPerArray) => {
    let i = 0;
    let twoDimension = []; // Store the generated two D array
    let tempArr = [...arr]; // Avoid modifying original array

    while (i < arr.length) {
      let subArray = []; // Store 2D subArray

      for (var j = 0; j < totalPerArray; j++) {
        if (tempArr.length) subArray.push(tempArr.shift());
      }

      twoDimension[twoDimension.length] = subArray;
      i += totalPerArray;
    }
    return twoDimension;
  };

  const handleGetAllFlights = async () => {
    let response = await getAllSeats();
    setCheckedList(response.data.seats);
  };

  function toggleOption(id, checked) {
    return checkedList.map((option) =>
      option._id === id
        ? { ...option, isChecked: checked }
        : { ...option, isChecked: false }
    );
  }

  const changeList = (id, checked) => {
    const newCheckedList = toggleOption(id, checked);
    setCheckedList(newCheckedList);
  };

  const handleButtonClick = () => {
    const payload = {
      flight_class: selectedSeat[0].type,
      seat_id: selectedSeat[0]._id,
      seat_no: selectedSeat[0].number,
    };

    const give = {
      ...prevData,
      ...payload,
    };

    dispatch(createBookFlight(give));
    setGoSteps(3);
  };

  useEffect(() => {
    handleGetAllFlights();
    dispatch(hideHeaderFooter(true));
  }, []);

  useEffect(() => {
    let selected = checkedList?.filter((seat) => seat.isChecked === true);
    setSelectedSeat(selected);
    let economyArr =
      checkedList &&
      twoDarray(
        checkedList?.filter((i) => i.type === 'Economy'),
        3
      );

    let multiEconomyArr = economyArr && twoDarray(economyArr, 2);
    setEconomy(multiEconomyArr);

    let businessArr =
      checkedList &&
      twoDarray(
        checkedList?.filter((i) => i.type === 'Business'),
        2
      );

    let multiBusinessArr = businessArr && twoDarray(businessArr, 2);
    console.log(multiBusinessArr);
    setBusiness(multiBusinessArr);
  }, [checkedList]);

  return (
    <>
      <div className='seats-form-main'>
        <div className='main-container'>
          <img src={planeImage} alt='plane' />
          <div className='plane-main'>
            <div className='plane-first'>
              <div className='plane-second'>
                <div className='business-seat-col-main'>
                  {business?.map((singArr, index) => (
                    <div className='business-inner'>
                      <div className='business-seat-row'>
                        {singArr &&
                          singArr[0]?.map((i) => (
                            <label
                              className={
                                i.booked
                                  ? 'b-sets'
                                  : i.isChecked
                                  ? 'sets-checked b-sets'
                                  : 'b-sets-to-booked b-sets'
                              }>
                              {!i.booked && (
                                <input
                                  type='radio'
                                  name='flight'
                                  id='flight'
                                  value={i._id}
                                  checked={i.checked}
                                  onChange={(e) =>
                                    changeList(i._id, e.target.checked)
                                  }
                                  className='rounded-full border focus:border-none'
                                />
                              )}
                            </label>
                          ))}
                      </div>
                      <p className='seat-index'>{index + 1}</p>
                      <div className='business-seat-row'>
                        {singArr &&
                          singArr[1]?.map((i) => (
                            <label
                              className={
                                i.booked
                                  ? 'b-sets'
                                  : i.isChecked
                                  ? 'sets-checked b-sets'
                                  : 'b-sets-to-booked b-sets'
                              }>
                              {!i.booked && (
                                <input
                                  type='radio'
                                  name='flight'
                                  id='flight'
                                  value={i._id}
                                  checked={i.checked}
                                  onChange={(e) =>
                                    changeList(i._id, e.target.checked)
                                  }
                                  className='rounded-full border focus:border-none'
                                />
                              )}
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='economy-seat-col-main'>
                  {economy?.map((singArr, index) => (
                    <div className='economy-inner'>
                      <div className='economy-seat-row'>
                        {singArr &&
                          singArr[0]?.map((i) => (
                            <label
                              className={
                                i.booked
                                  ? 'e-sets'
                                  : i.isChecked
                                  ? 'sets-checked e-sets'
                                  : 'e-sets-to-booked e-sets'
                              }>
                              {!i.booked && (
                                <input
                                  type='radio'
                                  name='flight'
                                  id='flight'
                                  value={i._id}
                                  checked={i.checked}
                                  onChange={(e) =>
                                    changeList(i._id, e.target.checked)
                                  }
                                  className='rounded-full border focus:border-none'
                                />
                              )}
                            </label>
                          ))}
                      </div>
                      <p className='seat-index'>{index + 1}</p>
                      <div className='economy-seat-row'>
                        {singArr &&
                          singArr[1]?.map((i) => (
                            <label
                              className={
                                i.booked
                                  ? 'e-sets'
                                  : i.isChecked
                                  ? 'sets-checked e-sets'
                                  : 'e-sets-to-booked e-sets'
                              }>
                              {!i.booked && (
                                <input
                                  type='radio'
                                  name='flight'
                                  id='flight'
                                  value={i._id}
                                  checked={i.checked}
                                  onChange={(e) =>
                                    changeList(i._id, e.target.checked)
                                  }
                                  className='rounded-full border focus:border-none'
                                />
                              )}
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='seats-main'>
          <div className='seats-head'>
            <div className='seat-place'>
              <p>{flight.origin}</p>
              <AiOutlineArrowRight />
              <p>{flight.destination}</p>
            </div>
            <div className='seat-dept'>
              <p>
                {new Date(flight.depart_time).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                |{' '}
                {new Date(flight.depart_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className='p-small'>Departure Time</p>
            </div>
            <div className='seat-arr'>
              <p>
                {new Date(flight.arrival_time).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                |{' '}
                {new Date(flight.arrival_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className='p-small'>Arrival Time</p>
            </div>
          </div>
          <div className='seats-body'>
            <div className='seat-type seats-economy'>
              <div className='seat-image'>
                <img src={require('../../images/EconomySeats.png')} alt='' />
              </div>

              <div className='seat-type-name'>
                <h2>Economy</h2>
                {selectedSeat && selectedSeat[0]?.type === 'Economy' ? (
                  <button>Selected</button>
                ) : null}
              </div>
              <p className='seat-type-text'>
                Rest and recharge during your flight with extended leg room,
                personalized service, and a multi-course meal service
              </p>
              <ul>
                <li>Built-in entertainment system</li>
                <li>Complimentary snacks and drinks</li>
                <li>One free carry-on and personal item</li>
              </ul>
            </div>

            <div className=' seat-type seats-business'>
              <div className='seat-image'>
                <img src={require('../../images/BusinessSeats.png')} alt='' />
              </div>
              <div className='seat-type-name'>
                <h2>Business</h2>
                {selectedSeat && selectedSeat[0]?.type === 'Business' ? (
                  <button>Selected</button>
                ) : null}
              </div>
              <p className='seat-type-text'>
                Rest and recharge during your flight with extended leg room,
                personalized service, and a multi-course meal service
              </p>
              <ul>
                <li>Extended leg room</li>
                <li>First two checked bags free</li>
                <li>Priority boarding</li>
                <li>Priority boarding</li>
                <li>Enhanced food and drink service</li>
                <li>Seats that recline 40% more than economy</li>
              </ul>
            </div>
          </div>
          <div className='seats-footer'>
            <div className='seat-foot-name'>
              <p>Passenger</p>
              <p>{flight.passenger_name}</p>
            </div>
            <div className='seat-foot-number'>
              <p>Seat Number</p>
              <p>{selectedSeat ? selectedSeat[0]?.number : 'not selected'}</p>
            </div>
            <div className='seat-foot-button'>
              <Button value='Payment Method' onClick={handleButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seats;
