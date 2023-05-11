import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionsAuth } from '../features/auth/authSlice';



function useAuth(api) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmitHandle = async values => {
    try {
      setError('');
      const userData = await api(values).unwrap();
      dispatch(actionsAuth.setCredential({ ...userData }));
      navigate('/');
    } catch (err) {
      console.log(err);
      if (err?.data?.message) return setError(err?.data?.message);
      setError('ошибка сервера');
    }
  };
  return [onSubmitHandle, error];
}

export default useAuth;
