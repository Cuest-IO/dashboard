import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import {
  FC,
  useMemo,
} from 'react';

export interface MuiThemeProviderProps extends Omit<ThemeProviderProps, 'theme'> {
  themeOptions: Record<string, ThemeOptions>;
}

const MuiThemeProvider: FC<MuiThemeProviderProps> = (props) => {
  const {
    themeOptions,
    children,
    ...restProps
  } = props;

  const themeName = 'light';

  const theme = useMemo(
    () => {
      return createTheme({
        ...(
          themeName
            ? themeOptions[themeName]
            : {}
        ),
      });
    },
    [
      themeOptions,
      themeName,
    ],
  );

  return (
    <StyledEngineProvider>
      <ThemeProvider
        theme={theme}
        {...restProps}
      >
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
