import { ReactNode } from 'react';


export interface ILayout {
  children: ReactNode;
}

export interface ITheme {
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
  };
  fonts: {
    main: string;
  };
}

export interface IThemeContextProps {
  theme: ITheme;
  toggleTheme: () => void;
}

export interface IThemeProviderProps {
  children: ReactNode;
}