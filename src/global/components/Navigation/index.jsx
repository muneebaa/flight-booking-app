import React, { useState, useEffect } from 'react';

import Button from '../Button';
import { Login, Register } from 'global/modals';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { company } from 'global/shared/constants/company';
import { useSelector } from 'react-redux';

function Navigation() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const hide = useSelector((state) => state.hide.hide);

  const navigate = useNavigate();
  function showModal(value) {
    if (value === 'login') {
      setLoginVisible(true);
    } else {
      setRegisterVisible(true);
    }
  }

  function hideModal(value) {
    if (value === 'login') {
      setLoginVisible(false);
    } else {
      setRegisterVisible(false);
    }
  }
  return (
    <div
      className={
        !hide
          ? 'navigation-main  flex-align-between'
          : 'navigation-hide-main flex-align-between'
      }>
      <div className='navigation-logo' onClick={() => navigate('/')}>
        <h1>{company.name}</h1>
      </div>

      {!hide && (
        <div className='navigation-links flex-align'>
          <p
            className='navigation-links-single'
            onClick={() => navigate('/set')}>
            Flights
          </p>
          <p
            className='navigation-links-single'
            onClick={() => navigate('/mytrips')}>
            My Trips
          </p>
          {user ? (
            <div className='navigation-user flex-align-center'>
              {/* <img src={require('../../../images/user.jpg')} alt='user' /> */}
              <p className='user-char-1'>
                {user?.name?.charAt(0).toUpperCase()}
              </p>
            </div>
          ) : (
            <div className='flex'>
              <Button value='Sign In' onClick={() => showModal('login')} />
              <Button value='Sign Up' onClick={() => showModal('register')} />
            </div>
          )}
        </div>
      )}

      <Rodal
        visible={loginVisible}
        onClose={() => hideModal('login')}
        width={550}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <Login />
      </Rodal>
      <Rodal
        visible={registerVisible}
        onClose={() => hideModal('register')}
        width={550}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <Register />
      </Rodal>
    </div>
  );
}

export default Navigation;
