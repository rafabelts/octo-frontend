import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CanBeNull } from '../types';

export interface AppContextType {
  activeTab: number;
  updateActiveTab: (tab: number) => void;
  categorySelected: string;
  updateCategorySelected: (cat: string) => void;
}

const AppContext = createContext<CanBeNull<AppContextType>>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  useEffect(() => {
    const tab = sessionStorage.getItem('activeTab');
    if (tab !== null) {
      setActiveTab(Number(tab)); // Parse session storage if exists
    }
  }, []);

  const [categorySelected, setCategorySelected] = useState<string>('');

  const updateActiveTab = (tab: number) => setActiveTab(tab);
  const updateCategorySelected = (cat: string) => setCategorySelected(cat);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        updateActiveTab,
        categorySelected,
        updateCategorySelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error(
      'useAppContext se debe usar con AppContextProvider como padre'
    );

  return context;
};
