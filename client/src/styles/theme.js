import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  }
  // overrides: {
  //   MuiButton: {
  //     raisedPrimary: {
  //       color: 'black',
  //     },
  //   },
  // }
});

export default theme;
