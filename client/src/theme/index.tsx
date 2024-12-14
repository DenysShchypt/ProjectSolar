import { useMemo, useState } from 'react';
import { ITheme, IThemeProviderProps } from '../common/types/layout';
import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { globalStyles } from '../Global';
import { ThemeContext } from '../utils/hooks';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
export const lightTheme: ITheme = {
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    secondaryBackground: '#f3fafb',
    text: '#000000',
    border: '#eeeeee',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
};

export const darkTheme: ITheme = {
  colors: {
    primary: '#bb86fc',
    background: '#121212',
    secondaryBackground: '#232323',
    text: '#ffffff',
    border: '#333333',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
};

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(lightTheme);

  const toggleTheme = useMemo(() => {
    return () => {
      setTheme((prevTheme) =>
        prevTheme === lightTheme ? darkTheme : lightTheme,
      );
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <EmotionThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
