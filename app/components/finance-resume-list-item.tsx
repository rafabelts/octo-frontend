interface FinanceResumeListItemProps {
  categoryIcon: string;
  categoryColor: string;
  name: string;
  total: string;
}

export default function FinanceResumeListItem(
  props: FinanceResumeListItemProps
) {
  return (
    <li>
      <div className="flex flex-row justify-between items-stretch">
        <div className="flex flex-row gap-5">
          <div className={`${props.categoryColor} px-1 rounded items-stretc`}>
            {props.categoryIcon}
          </div>
          <p>{props.name}</p>
        </div>
        <p className="text-right font-bold">${props.total}</p>
      </div>
    </li>
  );
}
