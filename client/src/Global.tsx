import { css } from '@emotion/react';
import { ITheme } from './common/types/layout';


export const globalStyles = (theme: ITheme) => css`
  /* @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap'); */

  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;

