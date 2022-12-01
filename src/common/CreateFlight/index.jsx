import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFlights } from 'services/flights/index';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import { Search } from '../../global/components';
import {
  CreateFlightModal,
  UpdateFlightModal,
  DeleteFlightModal,
} from 'global/modals';
import { Button } from '../../global/components';

import Rodal from 'rodal';
import './style.css';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/svg'];

function CreateFlight() {
  const [flights, setFlights] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [filteredData, setFilteredData] = useState();
  const [createPlaceModal, setCreatePlaceModal] = useState(false);
  const [updatePlaceModal, setUpdatePlaceModal] = useState(false);
  const [deletePlaceModal, setDeletePlaceModal] = useState(false);
  const dispatch = useDispatch();

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllFlights();
    setFlights(response.data.flight);
    setFilteredData(response.data.flight);
    // dispatch(setLoadingFinished());
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(flights);
    result = flights.filter((data) => {
      return (
        data.company.toLowerCase().search(value) != -1 ||
        data.origin.toLowerCase().search(value) != -1 ||
        // data.origin.toLowerCase().search(value) != -1 ||
        data.destination.toLowerCase().search(value) != -1
        // data.origin.toLowerCase().search(value) != -1
      );
    });
    setFilteredData(result);
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, [createPlaceModal, deletePlaceModal, updatePlaceModal]);

  return (
    <div className='create-place-main main-padding'>
      <Rodal
        visible={createPlaceModal}
        onClose={() => setCreatePlaceModal(false)}
        width={1000}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <CreateFlightModal setCreatePlaceModal={setCreatePlaceModal} />
      </Rodal>

      {updatePlaceModal && (
        <Rodal
          visible={updatePlaceModal}
          onClose={() => setUpdatePlaceModal(false)}
          width={1000}
          customStyles={{ borderRadius: '10px', height: 'max-content' }}>
          <UpdateFlightModal
            selectedFlight={selectedFlight}
            setUpdatePlaceModal={setUpdatePlaceModal}
          />
        </Rodal>
      )}

      <Rodal
        visible={deletePlaceModal}
        onClose={() => setDeletePlaceModal(false)}
        width={600}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <DeleteFlightModal
          selectedFlight={selectedFlight}
          setDeletePlaceModal={setDeletePlaceModal}
        />
      </Rodal>
      <div className='flex-between'>
        <h1 className='main-span'>All Flights</h1>
        <Button
          value='Create Flight'
          onClick={() => setCreatePlaceModal(true)}
        />
      </div>

      <Search handleSearch={handleSearch} />

      <div className='get-all-table-main'>
        <table className='get-all-table-single'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Total Seats</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((flight) => (
              <tr className='table-tr' key={flight._id}>
                <td>{flight.company}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.price}</td>
                <td>{flight.total_seats}</td>
                <td>
                  {' '}
                  {new Date(flight.arrival_time).toLocaleDateString('en-us', {
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  |{' '}
                  {new Date(flight.arrival_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td>
                  {new Date(flight.depart_time).toLocaleDateString('en-us', {
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  |{' '}
                  {new Date(flight.depart_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className='edit-icon'>
                  <AiTwotoneEdit
                    onClick={() => {
                      setSelectedFlight(flight);
                      setUpdatePlaceModal(true);
                    }}
                  />
                </td>
                <td className='delete-icon'>
                  <AiTwotoneDelete
                    onClick={() => {
                      setSelectedFlight(flight);
                      console.log(selectedFlight);
                      setDeletePlaceModal(true);
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

export default CreateFlight;
