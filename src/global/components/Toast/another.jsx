import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { hideAlert } from 'store/features/alertSlice';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ alertMessage, showAlert }) {
  const dispatch = useDispatch();

  const notify = () =>
    toast(alertMessage, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  if (showAlert) {
    notify();
    dispatch(hideAlert());
  } else {
  }

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='dark'
      />
    </div>
  );
}

export default Toast;
