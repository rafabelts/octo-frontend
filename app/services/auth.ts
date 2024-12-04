import { SignUpData } from '~/types';

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

    console.log(response.body);

    if (response.status === 201) {
      console.log('User created');
    }
  } catch {
    console.error('Error creating user');
  }
}
