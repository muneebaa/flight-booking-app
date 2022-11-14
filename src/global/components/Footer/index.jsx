import { company } from 'global/shared/constants/company';
import React from 'react';
import './style.css';

function Footer() {
  return (
    <div className='footer-main flex-align-between'>
      <div className='navigation-logo'>
        <h1>{company.name}</h1>
      </div>
      <p>© 2022 {company.name} incorporated</p>
    </div>
  );
}

export default Footer;
