import { redirect, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { WelcomeScreen } from '~/screens/welcome';

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      navigate('/finance', { replace: true });
    }
  }, []);

  return <WelcomeScreen />;
}
