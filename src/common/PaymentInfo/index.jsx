import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { hideHeaderFooter } from 'store/features/hideSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createBookFlight } from 'store/features/bookFlight';
import { postBookFlight } from 'services/bookFlight/index';
import { updateBookFlight } from 'services/seats/index';
import valid from 'card-validator';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineCreditCard,
  AiOutlineGoogle,
  AiFillApple,
} from 'react-icons/ai';
import { RiPaypalFill } from 'react-icons/ri';

import './style.css';
import { Button } from '../../global/components';

function PaymentInfo({ setGoSteps }) {
  const [selected, setSelected] = useState('Credit Card');
  // const [paymentInfo, setPaymentInfo] = useState({
  //   nameOnCard: '',
  //   cardNumber: '',
  //   expirationDate: '',
  //   ccv: '',
  // });
  const prevData = useSelector((state) => state.book.bookFlight);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setPaymentInfo((prevState) => ({ ...prevState, [name]: value }));
  // };

  const handleButtonClick = async (paymentInfo) => {
    if (
      !paymentInfo.nameOnCard ||
      !paymentInfo.cardNumber ||
      !paymentInfo.expirationDate ||
      !paymentInfo.ccv
    ) {
      return;
    }

    const payload = {
      billed: true,
    };

    const give = {
      ...prevData,
      ...payload,
    };

    dispatch(createBookFlight(give));
    let res = await postBookFlight(give);
    if (res.status === 201) {
      setGoSteps(4);
      updateBookFlight(prevData.seat_id);
    }
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        ccv: '',
      },
      validationSchema: yup.object().shape({
        nameOnCard: yup.string().required('Name on card is required'),
        cardNumber: yup
          .string()
          .test(
            'test-number',
            'Credit Card number is invalid e.g 4111111111111111',
            (value) => valid.number(value).isValid
          )
          .required('Card number is required'),
        expirationDate: yup.string().required('Expiration Date is required'),
        ccv: yup.string().required('CCV is required'),
      }),
      onSubmit: (values) => {
        handleButtonClick(values);
      },
    });

  useEffect(() => {
    dispatch(hideHeaderFooter(false));
  }, []);

  return (
    <div className='payment-info-main'>
      <h2 className='main-span'>Payment</h2>
      <p className='payment-info-text'>
        Select a payment method below. Tripma processes your payment securely
        with end-to-end encryption.
      </p>

      <div className='payment-methods-main flex-align'>
        <div
          className='payment-meth-single selected-meth flex-align'
          onClick={() => setSelected('Credit Card')}>
          <AiOutlineCreditCard />
          <p>Credit Card</p>
        </div>
        <div
          className='payment-meth-single flex-align'
          onClick={() => setSelected('Google Pay')}>
          <AiOutlineGoogle />
          <p>Google Pay</p>
        </div>
        <div
          className='payment-meth-single flex-align'
          onClick={() => setSelected('Apple Pay')}>
          <AiFillApple />
          <p>Apple Pay</p>
        </div>
        <div
          className='payment-meth-single flex-align'
          onClick={() => setSelected('Paypal')}>
          <RiPaypalFill />
          <p>Paypal</p>
        </div>
      </div>
      <p className='selected-meth-text'>{selected} details</p>

      <div className='selected-method-details '>
        <div className='input-single'>
          <input
            type='text'
            placeholder='Name on Card'
            name='nameOnCard'
            value={values.nameOnCard}
            onChange={handleChange('nameOnCard')}
            onBlur={handleBlur}
          />
          {errors.nameOnCard && touched.nameOnCard ? (
            <div>
              <p className='error'>{errors.nameOnCard}</p>
            </div>
          ) : null}
        </div>

        <div className='input-single'>
          <input
            type='text'
            placeholder='Card Number'
            name='cardNumber'
            value={values.cardNumber}
            onChange={handleChange('cardNumber')}
            onBlur={handleBlur}
          />
          {errors.cardNumber && touched.cardNumber ? (
            <div>
              <p className='error'>{errors.cardNumber}</p>
            </div>
          ) : null}
        </div>

        <div className='selected-det-separate'>
          <div className='input-single'>
            <input
              type='date'
              placeholder='Expiration Date'
              name='expirationDate'
              value={values.expirationDate}
              onChange={handleChange('expirationDate')}
              onBlur={handleBlur}
            />
            {errors.expirationDate && touched.expirationDate ? (
              <div>
                <p className='error'>{errors.expirationDate}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single'>
            <input
              type='text'
              placeholder='CCV'
              name='ccv'
              value={values.ccv}
              style={{ marginLeft: '1em' }}
              onChange={handleChange('ccv')}
              onBlur={handleBlur}
            />
            {errors.ccv && touched.ccv ? (
              <div>
                <p className='error'>{errors.ccv}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='payment-button'>
        <Button value={'Confirm and Pay'} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default PaymentInfo;
