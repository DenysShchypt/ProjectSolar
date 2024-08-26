import {  useMemo, useState } from "react"; 
import { ITheme, IThemeProviderProps } from "../common/types/layout";
import { Global,  ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { globalStyles } from "../Global";
import { ThemeContext }  from "../utils/hooks";

export const lightTheme = {
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    text: '#000000',
    border: '#eeeeee',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
};

export const darkTheme = {
  colors: {
    primary: '#bb86fc',
    background: '#121212',
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
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };
}, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <EmotionThemeProvider theme={theme}>
        <Global
          styles={globalStyles(theme)}
        />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};