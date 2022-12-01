import React, { useEffect, useState } from 'react';
import { Button } from 'global/components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAllFlights } from 'services/flights/index';
import { createSeat, getAllSeats, updateSeat } from 'services/seats/index';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';
function UpdateSeatModal({ selectedSeat, setUpdatePlaceModal }) {
  const dispatch = useDispatch();
  const [flights, setFlights] = useState();
  const [seats, setSeats] = useState();
  console.log(selectedSeat.number.replace(/\D/g, ''));

  const handleClick = async (seat) => {
    const payload = {
      number: `${seat.seat_no}${seat.seat_type === 'Business' ? 'B' : 'E'}`,
      type: seat.seat_type,
      isChecked: false,
      booked: false,
      flight: seat.flight,
    };

    let response = await createSeat(payload);

    console.log(response);
    if (response.status === 201) {
      dispatch(
        showAlert({
          message: 'Seat Updated Successfully',
          type: 'success',
        })
      );
      // setCreatePlaceModal(false);
    } else {
      dispatch(
        showAlert({
          message: 'Some thi ng went wrong',
          type: 'success',
        })
      );
    }
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        seat_no: selectedSeat.number.replace(/\D/g, ''),
        seat_type: selectedSeat.type,
        flight: selectedSeat.flight,
      },
      validationSchema: yup.object().shape({
        seat_no: yup.string().required('Seat number is required'),
        seat_type: yup.string().required('Seat type is required'),
        flight: yup.string().required('Flight is required'),
      }),
      onSubmit: (values) => {
        handleClick(values);
      },
    });

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllFlights();
    setFlights(response.data.flight);

    let res = await getAllSeats();
    setSeats(res.data.seats);

    // dispatch(setLoadingFinished());
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, []);

  // useEffect(() => {
  //   let eco = seats?.filter((i) => i.type === 'Economy');
  //   console.log(eco);
  // }, [flights]);

  return (
    <div>
      <h2 className='main-span'>Update Seat</h2>
      <div className='create-place-inputs-main'>
        <div className='flex'>
          <div className='inner-input'>
            <p>Seat Number</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='Number'
                name='seat_no'
                value={values.seat_no}
                onChange={handleChange('seat_no')}
                onBlur={handleBlur}
                maxLength={3}
              />
              <span className='modal-seat-type'>
                {values.seat_type === 'Business' ? 'B' : 'E'}
              </span>
              {errors.seat_no && touched.seat_no ? (
                <div>
                  <p className='error'>{errors.seat_no}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='inner-input m-left'>
            <p>Seat Type</p>
            <div className='input-single '>
              <select
                id='seat_type'
                name='seat_type'
                value={values.seat_type}
                onChange={handleChange('seat_type')}
                onBlur={handleBlur}>
                <option>Select Option ... </option>
                <option>Business</option>
                <option>Economy</option>
              </select>

              {errors.seat_type && touched.seat_type ? (
                <div>
                  <p className='error'>{errors.seat_type}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='inner-input'>
            <p>Flight</p>
            <div className='input-single'>
              {/* <input
                type='text'
                placeholder='Flight'
                name='flight'
                value={values.flight}
                onChange={handleChange('flight')}
                onBlur={handleBlur}
              /> */}
              <select
                id='flight'
                name='flight'
                value={values.flight}
                onChange={handleChange('flight')}
                onBlur={handleBlur}>
                <option>Select Option ... </option>
                {flights?.map((flight) => (
                  <option key={flight._id} value={flight._id}>
                    {flight.origin} - {flight.destination} - {flight._id}
                  </option>
                ))}
              </select>
              {errors.flight && touched.flight ? (
                <div>
                  <p className='error'>{errors.flight}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='create-place-button'>
          <Button value='Update' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default UpdateSeatModal;
