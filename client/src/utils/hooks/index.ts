import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createContext, useContext } from 'react';
import { IThemeContextProps } from '../../common/types/layout';
import { AppError } from '../../common/errors';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = (): boolean => {
  const {isLogged} = useAppSelector((state: RootState) => state.auth)
  return !!isLogged
  // return !!localStorage.getItem('token');
};

//Хук створення контексту для зберігання та зміни теми
export const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);

//Хук, який дозволяє компонентам отримувати доступ до значень theme і toggleTheme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(AppError.Wrong_useTheme);
  }
  return context;
};