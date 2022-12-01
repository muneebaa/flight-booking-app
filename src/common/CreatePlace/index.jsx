import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../global/components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaces, deletePlace } from 'services/places/index';
import Rodal from 'rodal';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import { Search } from 'global/components';
import {
  CreatePlaceModal,
  UpdatePlaceModal,
  DeletePlaceModal,
} from 'global/modals';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/svg'];

function CreatePlace() {
  const [places, setPlaces] = useState();
  const [filteredData, setFilteredData] = useState();
  const [selectedPlace, setSelectedPlaces] = useState();
  const [createPlaceModal, setCreatePlaceModal] = useState(false);
  const [updatePlaceModal, setUpdatePlaceModal] = useState(false);
  const [deletePlaceModal, setDeletePlaceModal] = useState(false);
  const dispatch = useDispatch();

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllPlaces();
    setPlaces(response.data.places);
    setFilteredData(response.data.places);
    // dispatch(setLoadingFinished());
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(places);
    result = places.filter((data) => {
      return (
        data.country.toLowerCase().search(value) != -1 ||
        data.city.toLowerCase().search(value) != -1
      );
    });
    setFilteredData(result);
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, [createPlaceModal, updatePlaceModal, deletePlaceModal]);

  return (
    <div className='create-place-main main-padding'>
      <Rodal
        visible={createPlaceModal}
        onClose={() => setCreatePlaceModal(false)}
        width={1000}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <CreatePlaceModal setCreatePlaceModal={setCreatePlaceModal} />
      </Rodal>
      {updatePlaceModal && (
        <Rodal
          visible={updatePlaceModal}
          onClose={() => setUpdatePlaceModal(false)}
          width={1000}
          customStyles={{ borderRadius: '10px', height: 'max-content' }}>
          <UpdatePlaceModal
            selectedPlace={selectedPlace}
            setUpdatePlaceModal={setUpdatePlaceModal}
          />
        </Rodal>
      )}
      <Rodal
        visible={deletePlaceModal}
        onClose={() => setDeletePlaceModal(false)}
        width={600}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <DeletePlaceModal
          selectedPlace={selectedPlace}
          setDeletePlaceModal={setDeletePlaceModal}
        />
      </Rodal>
      <div className='flex-between'>
        <h1 className='main-span'>All Places</h1>
        <Button
          value='Create Place'
          onClick={() => setCreatePlaceModal(true)}
        />
      </div>

      <Search handleSearch={handleSearch} />

      <div className='get-all-table-main'>
        <table className='get-all-table-single'>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((place) => (
              <tr className='table-tr' key={place._id}>
                <td>{place.country}</td>
                <td>{place.city}</td>
                <td>{place.description}</td>
                <td className='edit-icon'>
                  <AiTwotoneEdit
                    onClick={() => {
                      setSelectedPlaces(place);
                      setUpdatePlaceModal(true);
                    }}
                  />
                </td>
                <td className='delete-icon'>
                  <AiTwotoneDelete
                    onClick={() => {
                      setSelectedPlaces(place);
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

export default CreatePlace;
