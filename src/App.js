import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./Components/Header";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
      () =>
          createMuiTheme({
            palette: {
              type: prefersDarkMode ? 'dark' : 'light',
            },
          }),
      [prefersDarkMode],
  );

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header header={"Satellite Tracker"} />
      </ThemeProvider>
  );
}