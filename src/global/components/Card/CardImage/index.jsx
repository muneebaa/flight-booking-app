import React from 'react';
import { colors } from 'global/shared/constants/colors';
import './style.css';

function CardImage({ image, city, country, description, id }) {
  return (
    <div className='card-image-main'>
      <div className='card-image'>
        <img src={image} alt='place image' />
      </div>
      <div className='card-image-content'>
        <div className='card-content-name-price flex-align-between'>
          <p>
            {country}, <span style={{ color: colors.MAIN }}>{city}</span>
          </p>
        </div>
        <p className='card-content-description'>{description}</p>
      </div>
    </div>
  );
}

export default CardImage;
