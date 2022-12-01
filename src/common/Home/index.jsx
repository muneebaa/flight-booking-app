import React, { useState, useEffect } from 'react';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import './style.css';
import { colors } from 'global/shared/constants/colors';
import { BsArrowRight } from 'react-icons/bs';
import CardImage from 'global/components/Card/CardImage';
import { getAllPlaces } from 'services/places/index';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideHeaderFooter } from 'store/features/hideSlice';

function Home() {
  const [allPlaces, setAllPlaces] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetAllPlaces = async () => {
    // dispatch(setLoading());
    let response = await getAllPlaces();
    setAllPlaces(response.data.places);
    // dispatch(setLoadingFinished());
  };

  useEffect(() => {
    handleGetAllPlaces();
  }, []);

  useEffect(() => {
    console.log('useEffect');

    dispatch(hideHeaderFooter(false));
  }, []);

  return (
    <div className='home-main'>
      <div className='home-content flex-align-center-col'>
        <h1>It's more than just a trip</h1>
        <div className='book-tickets flex-align'>
          <p>Book your ticket now</p>
          <BsFillArrowDownCircleFill className='arrow-down-icon' />
        </div>
      </div>
      <div className='def-padding'>
        <div className='home-places-main'>
          <div className='home-places-desc flex-align-between'>
            <p>
              Find your next adventure with these{' '}
              <span style={{ color: colors.MAIN }}>places</span>
            </p>
            <div className='home-places-view-all '>
              <Link to='/places'>
                <div className='flex-align'>
                  <p>All</p>
                  <a href='allplace'>
                    <BsArrowRight
                      style={{ color: colors.TEXT_LIGHT, marginLeft: '0.5em' }}
                    />
                  </a>
                </div>
              </Link>
            </div>
          </div>
          <div
            className='home-all-places-main flex-align flex-wrap'
            id='allplace'>
            {allPlaces &&
              allPlaces?.slice(0, 6).map((place) => (
                <div
                  className='all-places-single'
                  key={place._id}
                  onClick={() => navigate(`${place._id}/flight`)}>
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
      </div>
    </div>
  );
}

export default Home;
