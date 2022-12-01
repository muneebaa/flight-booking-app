import React, { useState, useEffect } from 'react';

import Button from '../Button';
import { Login, Register } from 'global/modals';
import Rodal from 'rodal';

import { useNavigate } from 'react-router-dom';
import { company } from 'global/shared/constants/company';
import { AiOutlineLogout } from 'react-icons/ai';
import { logOutUser } from 'store/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import 'rodal/lib/rodal.css';
import './style.css';

function Navigation() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [logout, setLogout] = useState(false);
  // const user = JSON.parse(localStorage.getItem('user'));
  const hide = useSelector((state) => state.hide.hide);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const response = await dispatch(logOutUser()).unwrap();
    if (response) {
      navigate('/');
      setLogout(false);
    }
  };

  const handleOpenLogout = async () => {
    setLogout(!logout);
  };

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
        <>
          <div className='navigation-links flex-align'>
            {user.name && (
              <p
                className='navigation-links-single'
                onClick={() => navigate('/mytrips')}>
                My Trips
              </p>
            )}

            {user.role === 'admin' && (
              <>
                <p
                  className='navigation-links-single'
                  onClick={() => navigate('/createplace')}>
                  Create Place
                </p>
                <p
                  className='navigation-links-single'
                  onClick={() => navigate('/createflight')}>
                  Create Flight
                </p>

                <p
                  className='navigation-links-single'
                  onClick={() => navigate('/createseats')}>
                  Create Seats
                </p>
              </>
            )}

            {user.name ? (
              <>
                <div
                  className='navigation-user flex-align-center'
                  onClick={handleOpenLogout}>
                  {/* <img src={require('../../../images/user.jpg')} alt='user' /> */}
                  <p className='user-char-1'>
                    {user?.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
                {logout && (
                  <div className='logout-main flex-align'>
                    <AiOutlineLogout style={{ color: 'red' }} />
                    <p onClick={handleLogOut}>Logout</p>
                  </div>
                )}
              </>
            ) : (
              <div className='flex'>
                <Button value='Sign In' onClick={() => showModal('login')} />
                <Button value='Sign Up' onClick={() => showModal('register')} />
              </div>
            )}
          </div>
        </>
      )}

      <Rodal
        visible={loginVisible}
        onClose={() => hideModal('login')}
        width={550}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <Login setLoginVisible={setLoginVisible} />
      </Rodal>
      <Rodal
        visible={registerVisible}
        onClose={() => hideModal('register')}
        width={550}
        customStyles={{ borderRadius: '10px', height: 'max-content' }}>
        <Register setRegisterVisible={setRegisterVisible} />
      </Rodal>
    </div>
  );
}

export default Navigation;
