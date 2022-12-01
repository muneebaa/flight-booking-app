import { useState } from 'react';
import Button from 'global/components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/features/authSlice';

import './style.css';

function Login({ setLoginVisible }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (email, password) => {
    const payload = {
      email: email.trim().toLowerCase(),
      password: password,
    };
    await dispatch(userLogin(payload)).unwrap();

    setLoginVisible(false);
  };

  return (
    <>
      <div className='login-main'>
        <h1>Sign in for GetGo</h1>
        <div className='login-content flex-col'>
          <p>
            GetGo is totally free to use. Sign up using your email address below
            to get started.
          </p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email...'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password...'
          />
          <Button
            value='Login'
            width='100%'
            onClick={() => {
              handleClick(email, password);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
