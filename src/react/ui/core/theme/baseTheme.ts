import { ThemeOptions } from '@mui/material/styles';
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "../../components/common/RouterLink";

declare module "@mui/material/styles/createPalette" {
  /* eslint-disable no-unused-vars */
  interface CommonColors {
    'secondary.grey': string;
    'secondary.blue': string;
    'teritrary.blue': string;
    'teritrary.red': string;
    'teritrary.green': string;
    'secondary.green': string;
    'secondary.red': string;
  }
  /* eslint-enable */
}

const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: {
    },
    secondary: {
    },
  },
  typography: {
    fontFamily: 'Product Sans',
  },
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  zIndex: {
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  transitions: {
    easing: {
      easeIn: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
};

export default baseThemeOptions;
