interface ButtonProps {
  id: string;
  label: string;
  border?: string;
  bgColor: string;
  fontColor: string;
  fontSize: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export function Button({
  id,
  label,
  border,
  bgColor,
  fontColor,
  fontSize,
  type = undefined,
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      id={id}
      className={`w-full flex justify-center p-2 rounded-lg ${bgColor}  ${fontSize} ${border}`}
    >
      <p className={`${fontColor} font-semibold`}>{label}</p>
    </button>
  );
}
