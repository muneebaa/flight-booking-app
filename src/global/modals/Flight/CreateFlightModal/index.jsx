import React, { useEffect, useState } from 'react';
import { Button } from 'global/components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createFlight } from 'services/flights/index';
import { getAllPlaces } from 'services/places/index';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function CreateFlightModal({ setCreatePlaceModal }) {
  const dispatch = useDispatch();
  const [places, setPlaces] = useState();

  const handleClick = async (flight) => {
    const payload = {
      company: flight.company,
      origin: flight.origin,
      price: flight.price,
      arrival_time: flight.arrival_time,
      depart_time: flight.depart_time,
      place: flight.place,
    };

    let response = await createFlight(payload);

    console.log(response);
    if (response.status === 201) {
      dispatch(
        showAlert({
          message: 'Flight Created Successfully',
          type: 'success',
        })
      );
      setCreatePlaceModal(false);
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
        company: '',
        origin: '',
        price: '',
        arrival_time: '',
        depart_time: '',
        place: '',
      },
      validationSchema: yup.object().shape({
        company: yup
          .string()
          .min(2, 'Cannot be less than 3 characters')
          .required('Company name is required'),
        origin: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Origin of flight is required'),
        price: yup.number().required('Price is required'),
        arrival_time: yup.date().required('Arrival time is required'),
        depart_time: yup.date().required('Departure time is required'),
        place: yup.string().required('Place is required'),
      }),
      onSubmit: (values) => {
        handleClick(values);
      },
    });

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllPlaces();
    setPlaces(response.data.places);
    // dispatch(setLoadingFinished());
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, []);
  return (
    <div>
      <h2 className='main-span'>Create Flight</h2>
      <div className='create-place-inputs-main'>
        <div className='flex'>
          <div className='inner-input'>
            <p>Company</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='Company'
                name='company'
                value={values.company}
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
              <select
                id='place'
                name='place'
                value={values.place}
                onChange={handleChange('place')}
                onBlur={handleBlur}>
                <option>Select Option ... </option>
                {places?.map((place) => (
                  <option key={place._id} value={place._id}>
                    {place.city}
                  </option>
                ))}
              </select>
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

export default CreateFlightModal;
