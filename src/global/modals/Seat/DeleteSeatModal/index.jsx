import React from 'react';
import { Button } from 'global/components';

import { deleteSeat } from 'services/seats';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function DeleteSeatModal({ selectedSeat, setDeleteSeatModal }) {
  const dispatch = useDispatch();
  console.log(selectedSeat);

  const handleClick = async () => {
    console.log(selectedSeat);
    let response = await deleteSeat(selectedSeat._id);

    console.log(response);
    if (response.status === 200) {
      dispatch(
        showAlert({
          message: 'Seat Deleted Successfully',
          type: 'success',
        })
      );
      setDeleteSeatModal(false);
    }
  };

  return (
    <div className='delete-modal-main'>
      <h2 className='main-span'>Delete Seat</h2>
      <p>Are you sure you want to delete this seat</p>

      <div className='delete-place-button'>
        <Button value='Delete' onClick={handleClick} />
      </div>
    </div>
  );
}

export default DeleteSeatModal;
