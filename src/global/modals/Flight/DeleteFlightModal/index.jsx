import React from 'react';
import { Button } from 'global/components';

import { deleteFlight } from 'services/flights/index';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function DeleteFlightModal({ selectedFlight, setDeletePlaceModal }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    console.log(selectedFlight);
    let response = await deleteFlight(selectedFlight._id);

    console.log(response);
    if (response.status === 200) {
      dispatch(
        showAlert({
          message: 'Flight Deleted Successfully',
          type: 'success',
        })
      );
      setDeletePlaceModal(false);
    }
  };

  return (
    <div className='delete-modal-main'>
      <h2 className='main-span'>Delete Flight</h2>
      <p>Are you sure you want to delete this place</p>

      <div className='delete-place-button'>
        <Button value='Delete' onClick={handleClick} />
      </div>
    </div>
  );
}

export default DeleteFlightModal;
