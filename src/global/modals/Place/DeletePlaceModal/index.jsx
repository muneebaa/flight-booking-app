import React from 'react';
import { Button } from 'global/components';

import { deletePlace } from 'services/places/index';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function DeletePlaceModal({ selectedPlace, setDeletePlaceModal }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    let response = await deletePlace(selectedPlace._id);

    console.log(response);
    if (response.status === 200) {
      dispatch(
        showAlert({
          message: 'Place Deleted Successfully',
          type: 'success',
        })
      );
      setDeletePlaceModal(false);
    }
  };

  return (
    <div className='delete-modal-main'>
      <h2 className='main-span'>Delete Place</h2>
      <p>Are you sure you want to delete this place</p>

      <div className='delete-place-button'>
        <Button value='Delete' onClick={handleClick} />
      </div>
    </div>
  );
}

export default DeletePlaceModal;
