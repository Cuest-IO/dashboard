import { ThemeOptions } from '@mui/material/styles';
import baseThemeOptions from './baseTheme';

const lightTheme: ThemeOptions = Object.assign({}, baseThemeOptions, {
  palette: {
    mode: 'light',
    background: {
      default: '#f9f9f9',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#00A1EF',
      light: '#F1FAFF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#575757',
      light: '#979797',
      contrastText: '#FFFFFF',
      dark: '#575757'
    },
    error: {
      main: '#FFE7E4',
      contrastText: '#FF6A55',
    },
    text: {
      primary: '#575757',
      secondary: '#575757',
    },
    common: {
      "secondary.blue": '#78CAF4',
      "secondary.grey": '#979797',
      "teritrary.blue": '#DCF9FF',
      "teritrary.red": '#FFE7E4',
      "teritrary.green": '#EBFFD2',
      "secondary.green": '#83BF6E',
      "secondary.red": '#FF6A55'

    },
  },
} as ThemeOptions);

export default lightTheme;
