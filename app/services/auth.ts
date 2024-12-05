import { useNavigate } from '@remix-run/react';
import { LogInData, SignUpData } from '~/types';

export async function registerUser(user: SignUpData) {
  try {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.confirmPassword,
      }),
    });

    if (response.ok) {
      const userId = await response.json();
      return userId;
    }
  } catch {
    console.error('Error creating user');
  }
}

export async function logIn(user: LogInData) {
  try {
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    if (response.ok) {
      const userId = await response.json();
      return userId;
    }
  } catch {
    console.error('Error loging in');
  }
}
