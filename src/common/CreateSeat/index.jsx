import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../global/components';
import { getAllSeats } from 'services/seats/index';
import { Search } from '../../global/components';

import Rodal from 'rodal';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import {
  CreateSeatModal,
  UpdateSeatModal,
  DeleteSeatModal,
} from 'global/modals';

function CreateSeat() {
  const [seats, setSeats] = useState();
  const [selectedSeat, setSelectedSeats] = useState();
  const [createSeatModal, setCreateSeatModal] = useState(false);
  const [updateSeatModal, setUpdateSeatModal] = useState(false);
  const [deleteSeatModal, setDeleteSeatModal] = useState(false);
  const [filteredData, setFilteredData] = useState();

  const handleGetAllSeats = async () => {
    let response = await getAllSeats();
    setSeats(response.data.seats);
    setFilteredData(response.data.seats);
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(seats);
    result = seats.filter((data) => {
      return (
        data.number.toLowerCase().search(value) != -1 ||
        data.type.toLowerCase().search(value) != -1 ||
        data.flight.toLowerCase().search(value) != -1
        // data.origin.toLowerCase().search(value) != -1 ||
        // data.destination.toLowerCase().search(value) != -1
        // data.origin.toLowerCase().search(value) != -1
      );
    });
    setFilteredData(result);
  };

  useEffect(() => {
    handleGetAllSeats();
  }, [createSeatModal, updateSeatModal, deleteSeatModal]);

  return (
    <div className='create-places-main main-padding'>
      <Rodal
        visible={createSeatModal}
        onClose={() => setCreateSeatModal(false)}
        width={1000}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <CreateSeatModal setCreateSeatModal={setCreateSeatModal} />
      </Rodal>
      {updateSeatModal && (
        <Rodal
          visible={updateSeatModal}
          onClose={() => setUpdateSeatModal(false)}
          width={1000}
          customStyles={{ borderRadius: '10px', height: 'max-content' }}>
          <UpdateSeatModal
            selectedSeat={selectedSeat}
            setUpdateSeatModal={setUpdateSeatModal}
          />
        </Rodal>
      )}
      <Rodal
        visible={deleteSeatModal}
        onClose={() => setDeleteSeatModal(false)}
        width={600}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <DeleteSeatModal
          selectedSeat={selectedSeat}
          setDeleteSeatModal={setDeleteSeatModal}
        />
      </Rodal>
      <div className='flex-between'>
        <h1 className='main-span'>All Seats</h1>
        <Button value='Create Seat' onClick={() => setCreateSeatModal(true)} />
      </div>

      <Search handleSearch={handleSearch} />

      <div className='get-all-table-main'>
        <table className='get-all-table-single'>
          <thead>
            <tr>
              <th>Seat no.</th>
              <th>Seat Type</th>
              <th>Flight</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((Seat) => (
              <tr className='table-tr' key={Seat._id}>
                <td>{Seat.number}</td>
                <td>{Seat.type}</td>
                <td>{Seat.flight}</td>
                <td className='edit-icon'>
                  <AiTwotoneEdit
                    onClick={() => {
                      setSelectedSeats(Seat);
                      setUpdateSeatModal(true);
                    }}
                  />
                </td>
                <td className='delete-icon'>
                  <AiTwotoneDelete
                    onClick={() => {
                      setSelectedSeats(Seat);
                      setDeleteSeatModal(true);
                      console.log(selectedSeat);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateSeat;
