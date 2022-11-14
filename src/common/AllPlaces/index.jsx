import React, { useEffect, useState } from 'react';
import CardImage from 'global/components/Card/CardImage';
import { getAllPlaces } from 'services/places/index';
import { colors } from 'global/shared/constants/colors';

import { BsArrowLeft } from 'react-icons/bs';

import './style.css';
import { useNavigate } from 'react-router-dom';

function AllPlaces() {
  const [allPlaces, setAllPlaces] = useState();
  const navigate = useNavigate();

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllPlaces();
    setAllPlaces(response.data.places);
    // dispatch(setLoadingFinished());
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, []);
  return (
    <div className='all-places-component'>
      <BsArrowLeft
        style={{
          color: colors.TEXT_LIGHT,
          marginTop: '1em',
          fontSize: '2rem',
        }}
        onClick={() => navigate('/')}
      />
      <div className='home-all-places-main flex-align flex-wrap'>
        {allPlaces &&
          allPlaces?.map((place) => (
            <div
              className='all-places-single'
              key={place._id}
              onClick={() => navigate(`${place._id}/departureplaces`)}>
              <CardImage
                image={place.image}
                city={place.city}
                country={place.country}
                description={place.description}
                price={place.price}
                id={place._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllPlaces;
