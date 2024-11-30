interface ButtonProps {
  id: string;
  label: string;
  bgColor: string;
  fontColor: string;
  fontSize: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      id={props.id}
      className={`w-full flex justify-center p-2 rounded-lg ${props.bgColor}  ${props.fontSize}`}
    >
      <p className={`${props.fontColor} font-semibold`}>{props.label}</p>
    </button>
  );
}
