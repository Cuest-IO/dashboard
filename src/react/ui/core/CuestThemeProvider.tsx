import  MuiThemeProvider, { MuiThemeProviderProps } from './theme/MuiThemeProvider';
import { ThemeOptions } from '@mui/material/styles';
import {
  FC,
  useMemo,
} from 'react';
import lightTheme from './theme/lightTheme';

export type ThemeProviderProps = Omit<MuiThemeProviderProps, 'themeOptions'>;

const CuestThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {
    children,
    ...restProps
  } = props;

  const themeOptions = useMemo<Record<string, ThemeOptions>>(() => (
    {
      'light': lightTheme,
    }
  ), []);

  return (
    <MuiThemeProvider
      themeOptions={themeOptions}
      {...restProps}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default CuestThemeProvider;
