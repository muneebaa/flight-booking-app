import React from 'react';
import { createBookFlight } from 'store/features/bookFlight';
import { Button } from '../../global/components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

function PassengerForm({ setGoSteps }) {
  const prevData = useSelector((state) => state.book.bookFlight);
  const dispatch = useDispatch();

  const handleClick = (person) => {
    const payload = {
      passenger_name: `${person.firstName} ${person.middleName} ${person.lastName}`,
      contact_number: person.contactNumber,
      email: person.email,
      address: person.address,
      DOB: person.DOB,
      emergency_person_name: `${person.emergency_person_fname} ${person.emergency_person_lname}`,
      emergency_contact_email: person.emergency_contact_email,
      emergency_contact_number: person.emergency_contact_number,
    };

    const allData = {
      ...prevData,
      ...payload,
    };

    dispatch(createBookFlight(allData));
    setGoSteps(2);
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        contactNumber: '',
        address: '',
        DOB: '',
        emergency_person_fname: '',
        emergency_person_lname: '',
        emergency_contact_email: '',
        emergency_contact_number: '',
      },
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Firstname is required'),
        lastName: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Lastname is required'),
        middleName: yup.string().min(3, 'Cannot be less than 3 characters'),
        email: yup
          .string()
          .email('Invalid Email')
          .required('Email is required'),
        contactNumber: yup
          .string()
          .min(11, 'Cannot be less than 11 characters')
          .max(11, 'Cannot be more than 11 characters')
          .required('Contact number is required'),
        address: yup
          .string()
          .min(5, 'Cannot be less than 5 characters')
          .required('Address is required'),
        DOB: yup.string().required('Date of Birth is required'),
        emergency_person_fname: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Emergency contact firstname is required'),
        emergency_person_lname: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Emergency contact lastname is required'),
        emergency_contact_email: yup
          .string()
          .email('Invalid Email')
          .required('Emergency contact email is required'),
        emergency_contact_number: yup
          .string()
          .min(11, 'Cannot be less than 11 characters')
          .max(11, 'Cannot be more than 11 characters')
          .required('Emergency contact number is required'),
      }),
      onSubmit: (values) => {
        handleClick(values);
      },
    });

  return (
    <div className='passenger-form-main'>
      <h2 className='main-span'>Passenger Information</h2>
      <p className='passenger-info-text'>
        Enter the required information for each traveler and be sure that it
        exactly matches the government-issued ID presented at the airport.
      </p>
      <div className='passenger-info-form-main'>
        <div className='flex passenger-form-input-main '>
          <div className='input-single'>
            <input
              type='text'
              placeholder='First Name'
              name='firstName'
              value={values.firstName}
              onChange={handleChange('firstName')}
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName ? (
              <div>
                <p className='error'>{errors.firstName}</p>
              </div>
            ) : null}
          </div>

          <div className='input-single m-left'>
            <input
              type='text'
              placeholder='Middle Name'
              name='middleName'
              value={values.middleName}
              onChange={handleChange('middleName')}
              onBlur={handleBlur}
            />
            {errors.middleName && touched.middleName ? (
              <div>
                <p className='error'>{errors.middleName}</p>
              </div>
            ) : null}
          </div>

          <div className='input-single m-left'>
            <input
              type='text'
              placeholder='Last Name'
              name='lastName'
              value={values.lastName}
              onChange={handleChange('lastName')}
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName ? (
              <div>
                <p className='error'>{errors.lastName}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='flex passenger-form-input-main'>
          <div className='input-single'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div>
                <p className='error'>{errors.email}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single m-left'>
            <input
              type='number'
              placeholder='Phone number'
              name='contactNumber'
              value={values.contactNumber}
              onChange={handleChange('contactNumber')}
              onBlur={handleBlur}
            />
            {errors.contactNumber && touched.contactNumber ? (
              <div>
                <p className='error'>{errors.contactNumber}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='flex passenger-form-input-main'>
          <div className='input-single'>
            <input
              type='text'
              placeholder='Address'
              name='address'
              value={values.address}
              onChange={handleChange('address')}
              onBlur={handleBlur}
            />
            {errors.address && touched.address ? (
              <div>
                <p className='error'>{errors.address}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single m-left'>
            <input
              type='text'
              placeholder='Date of Birth'
              name='DOB'
              value={values.DOB}
              onChange={handleChange('DOB')}
              onBlur={handleBlur}
            />
            {errors.DOB && touched.DOB ? (
              <div>
                <p className='error'>{errors.DOB}</p>
              </div>
            ) : null}
          </div>
        </div>

        <p className='passenger-emergency-contact'>Emergency Contact Number</p>

        <div className='flex passenger-form-input-main '>
          <div className='input-single'>
            <input
              type='text'
              placeholder='First Name'
              name='emergency_person_fname'
              value={values.emergency_person_fname}
              onChange={handleChange('emergency_person_fname')}
              onBlur={handleBlur}
            />
            {errors.emergency_person_fname && touched.emergency_person_fname ? (
              <div>
                <p className='error'>{errors.emergency_person_fname}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single m-left'>
            <input
              type='text'
              placeholder='Last Name'
              name='emergency_person_lname'
              value={values.emergency_person_lname}
              onChange={handleChange('emergency_person_lname')}
              onBlur={handleBlur}
            />
            {errors.emergency_person_lname && touched.emergency_person_lname ? (
              <div>
                <p className='error'>{errors.emergency_person_lname}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='flex passenger-form-input-main'>
          <div className='input-single'>
            <input
              type='text'
              placeholder='Email'
              name='emergency_contact_email'
              value={values.emergency_contact_email}
              onChange={handleChange('emergency_contact_email')}
              onBlur={handleBlur}
            />
            {errors.emergency_contact_email &&
            touched.emergency_contact_email ? (
              <div>
                <p className='error'>{errors.emergency_contact_email}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single m-left'>
            <input
              type='number'
              placeholder='Phone number'
              name='emergency_contact_number'
              value={values.emergency_contact_number}
              onChange={handleChange('emergency_contact_number')}
              onBlur={handleBlur}
            />
            {errors.emergency_contact_number &&
            touched.emergency_contact_number ? (
              <div>
                <p className='error'>{errors.emergency_contact_number}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='passenger-bag-main'>
          <p className='passenger-emergency-contact'>Bag Information</p>
          <p className='passenger-bag-info'>
            Each passenger is allowed one free carry-on bag and one personal
            item. First checked bag for each passenger is also free. Second bag
            check fees are waived for loyalty program members.
          </p>
          {/* <div className='no-of-bag-main  '>
            <p className='no-bags-text'>Total number Bags</p>
            <div className='flex-align-between'>
              <p>Muneeba</p>
              <div className='no-of-bag-buttons flex'>
                <button className='flex-center'>+</button>
                <p>2</p>
                <button className='flex-center'>-</button>
              </div>
            </div>
          </div> */}
          <div className='passenger-button'>
            <Button value='Select Seat' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerForm;
