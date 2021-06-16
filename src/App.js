import React, {Suspense} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./Components/Custom/Header";
// import Earth from "./Components/Earth/Earth";

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

  const [satellite, setSatellite] = React.useState('');

  const satelliteName = (satellite) => {
      setSatellite(satellite);
  };

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header header={"Satellite Tracker"} selectedSatellite={satelliteName}/>
          {satellite}
          {/*<Suspense fallback={null}>*/}
          {/*    <Earth position={[0, 0, 0]} />*/}
          {/*</Suspense>*/}
      </ThemeProvider>
  );
}