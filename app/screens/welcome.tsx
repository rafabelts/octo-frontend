import { Link } from '@remix-run/react';
import { Button } from '~/components/button';

export function WelcomeScreen() {
  return (
    <main id="welcome-screen" className="flex flex-col h-screen justify-center">
      <img
        src="../../public/octologo.svg"
        alt="Octoconta-logo"
        id="Octoconta-logo"
      />
      <div className="flex flex-col items-center w-full mb-8" id="welcome-text">
        <h1>¡Bienvenido!</h1>
        <p>Soy octo 🐙, tu nuevo ayudante contable</p>
      </div>
      <div
        className="flex flex-col items-center w-full mt-8"
        id="buttons-for-auth"
      >
        <Link to="/signup" className="w-full">
          <Button
            id="create-account-button"
            label="Crear cuenta"
            bgColor="bg-primary-normalHover"
            fontColor="text-neutral-light"
            fontSize="text-title1"
          />
        </Link>
        <p className="mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-accent-dark font-bold">
            ¡Inicia sesión!
          </Link>
        </p>
      </div>
    </main>
  );
}
