import { useState } from 'react';
import Button from 'global/components/Button';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/features/authSlice';

import './style.css';

function Login() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    // name: '',
    password: '',
    email: '',
  });

  const handleClick = async () => {
    const payload = {
      email: info.email.trim(),
      password: info.password,
      // name: info.name.trim(),
    };


    await dispatch(userLogin(JSON.stringify(payload) || null)).unwrap();
  };

  return (
    <div className='login-main'>
      <h1>Sign up for GetGo</h1>
      <div className='login-content flex-col'>
        <p>
          GetGo is totally free to use. Sign up using your email address below
          to get started.
        </p>
        {/* <input
          type='text'
          placeholder='Name'
          onChange={(e) =>
            setInfo((prevState) => ({ ...prevState, name: e.target.value }))
          }
        /> */}
        <input
          type='text'
          placeholder='Email'
          onChange={(e) =>
            setInfo((prevState) => ({ ...prevState, email: e.target.value }))
          }
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) =>
            setInfo((prevState) => ({ ...prevState, password: e.target.value }))
          }
        />
        <Button value='Create account' width='100%' onClick={handleClick} />
      </div>
    </div>
  );
}

export default Login;
