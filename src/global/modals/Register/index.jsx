import { useState } from 'react';
import Button from 'global/components/Button';
import { useDispatch } from 'react-redux';
import { userRegister } from 'store/features/authSlice';

import './style.css';

function Register({ setRegisterVisible }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = async (email, password) => {
    const payload = {
      email: email.trim().toLowerCase(),
      password: password,
      name: name.trim(),
    };

    await dispatch(userRegister(payload)).unwrap();
    setRegisterVisible(false);
  };

  return (
    <div className='login-main'>
      <h1>Sign up for GetGo</h1>
      <div className='login-content flex-col'>
        <p>
          GetGo is totally free to use. Sign up using your email address below
          to get started.
        </p>

        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name...'
        />

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
          value='Create account'
          width='100%'
          onClick={() => handleClick(email, password)}
        />
      </div>
    </div>
  );
}

export default Register;
