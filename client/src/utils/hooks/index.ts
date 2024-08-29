import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createContext, useContext } from 'react';
import { IThemeContextProps } from '../../common/types/layout';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = (): boolean => {
  const {isLogged} = useAppSelector((state: RootState) => state.auth)
  return !!isLogged
  // return !!localStorage.getItem('token');
};

//Хук контексту для зміни теми
export const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};