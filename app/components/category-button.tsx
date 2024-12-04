import { useAppContext } from '~/context/ctxt';
import { CanBeNull } from '~/types';

interface CategoryButtonProps {
  icon: string;
  name: string;
  color: string;
  onClick: CanBeNull<() => void>;
}

export function CategoryButton(props: CategoryButtonProps) {
  const ctx = useAppContext();
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center py-2 rounded ${
        props.name === ctx!.categorySelected
          ? '' // No background color class here, as we'll use inline styles
          : 'bg-[#9B9B9B]'
      }`}
      style={{
        backgroundColor:
          props.name === ctx!.categorySelected ? props.color : undefined,
      }}
      onClick={props.onClick!}
    >
      <p>{props.icon}</p>
      <p className="text-caption text-center text-neutral-light font-bold">
        {props.name}
      </p>
    </button>
  );
}
