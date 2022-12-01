import React from 'react';
import { Button } from 'global/components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createFlight, updateFlight } from 'services/flights/index';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function UpdatePlaceModal({ selectedFlight, setUpdatePlaceModal }) {
  const dispatch = useDispatch();

  const handleClick = async (flight) => {
    const payload = {
      company: flight.company,
      origin: flight.origin,
      price: flight.price,
      arrival_time: flight.arrival_time,
      depart_time: flight.depart_time,
      place: flight.place,
    };

    let response = await updateFlight(payload, selectedFlight._id);

    console.log(response);
    if (response.status === 200) {
      dispatch(
        showAlert({
          message: 'Flight Updated Successfully',
          type: 'success',
        })
      );
      setUpdatePlaceModal(false);
    } else {
      dispatch(
        showAlert({
          message: 'Some thing went wrong',
          type: 'success',
        })
      );
    }
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        // company: '',
        // origin: '',
        // price: '',
        // arrival_time: '',
        // depart_time: '',
        // place: '',
        company: selectedFlight.company,
        origin: selectedFlight.origin,
        price: selectedFlight.price,
        arrival_time: selectedFlight.arrival_time,
        depart_time: selectedFlight.depart_time,
        place: selectedFlight.place,
      },
      validationSchema: yup.object().shape({
        company: yup.string().min(2, 'Cannot be less than 3 characters'),
        origin: yup.string().min(3, 'Cannot be less than 3 characters'),
        price: yup.number(),
        arrival_time: yup.date(),
        depart_time: yup.date(),
        place: yup.string(),
      }),
      onSubmit: (values) => {
        handleClick(values);
      },
    });
  return (
    <div>
      <h2 className='main-span'>Update Flight</h2>
      <div className='create-place-inputs-main'>
        <div className='flex'>
          <div className='inner-input'>
            <p>Company</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='Company'
                name='company'
                value={selectedFlight?.company}
                onChange={handleChange('company')}
                onBlur={handleBlur}
              />
              {errors.company && touched.company ? (
                <div>
                  <p className='error'>{errors.company}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='inner-input m-left'>
            <p>Origin</p>
            <div className='input-single '>
              <input
                type='text'
                placeholder='Origin'
                name='origin'
                value={values.origin}
                onChange={handleChange('origin')}
                onBlur={handleBlur}
              />
              {errors.origin && touched.origin ? (
                <div>
                  <p className='error'>{errors.origin}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='inner-input'>
            <p>Price</p>
            <div className='input-single'>
              <input
                type='number'
                placeholder='Price'
                name='price'
                value={values.price}
                onChange={handleChange('price')}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <div>
                  <p className='error'>{errors.price}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='inner-input  m-left'>
            <p>Departure Time</p>
            <div className='input-single'>
              <input
                type='datetime-local'
                name='depart_time'
                value={values.depart_time}
                onChange={handleChange('depart_time')}
                onBlur={handleBlur}
              />
              {errors.depart_time && touched.depart_time ? (
                <div>
                  <p className='error'>{errors.depart_time}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='inner-input'>
            <p>Arrival Time</p>
            <div className='input-single'>
              <input
                type='datetime-local'
                name='arrival_time'
                value={values.arrival_time}
                onChange={handleChange('arrival_time')}
                onBlur={handleBlur}
              />
              {errors.arrival_time && touched.arrival_time ? (
                <div>
                  <p className='error'>{errors.arrival_time}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className='inner-input m-left'>
            <p>Place</p>
            <div className='input-single '>
              <input
                type='text'
                placeholder='Place'
                name='place'
                value={values.place}
                onChange={handleChange('place')}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <div>
                  <p className='error'>{errors.place}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='create-place-button'>
          <Button value='Create' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default UpdatePlaceModal;
