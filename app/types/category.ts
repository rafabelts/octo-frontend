import { CanBeNull } from '.';

export interface ResponseOfCategory {
  categoryId: number;
  color: string;
  icon: string;
  isActive: boolean | null;
  name: string;
  type: string;
  user: number;
  onClick: CanBeNull<() => void>;
}
