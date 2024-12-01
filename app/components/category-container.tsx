/* 
import { useAppContext } from '~/context/ctxt';

interface CategoryButtonProps {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}

export function CategoryButton(props: CategoryButtonProps) {
  const ctx = useAppContext();
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center py-2 rounded ${
        props.label === ctx!.categorySelected
          ? '' // No background color class here, as we'll use inline styles
          : 'bg-[#9B9B9B]'
      }`}
      style={{
        backgroundColor:
          props.label === ctx!.categorySelected ? props.color : undefined,
      }}
      onClick={props.onClick}
    >
      <p>{props.icon}</p>
      <p className="text-caption text-center text-neutral-light font-bold">
        {props.label}
      </p>
    </button>
  );
}

*/

export function CategoryContainer() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded"
      style={{ backgroundColor: '#9B9B9B' }}
    >
      <p className="text-[96px]">🥘</p>
      <p className="text-title1 font-semibold text-[#FFFF]">Alimentos</p>
    </div>
  );
}
