import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { SignUpScreen } from '~/screens/signup';

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      navigate('/', { replace: true });
    }
  }, []);

  return <SignUpScreen />;
}
