import { useEffect, useState } from 'react';
import { WelcomeScreen } from '~/screens/welcome';
import Finance from '../screens/finance';

export default function Index() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  return !loggedIn ? <WelcomeScreen /> : <Finance />;
}
