import { Button } from '~/components/button';

export default function SignUpScreen() {
  return (
    <main id="signup-screen" className="flex flex-col h-screen justify-start">
      <h1 className="text-h1 ">¡Hola!</h1>
      <p>Rellena los siguientes campos para continuar</p>

      <form id="signup-form" className="flex flex-col">
        <span className="text-caption text-neutral-normal mb-5">
          Al continuar, aceptas nuestro <b>Acuerdo de Usuario</b> y reconoces
          que comprendes la <b>Política de Privacidad</b>
        </span>
        <Button
          id="signup-button"
          label="Continuar"
          bgColor="bg-primary-normalHover"
          fontColor="text-neutral-light"
          fontSize="text-title1"
        />
      </form>
    </main>
  );
}
