import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { LogInScreen } from '~/screens/login';

export default function LogIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      navigate('/', { replace: true });
    }
  }, []);

  return <LogInScreen />;
}
