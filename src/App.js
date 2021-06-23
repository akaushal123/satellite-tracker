import React, {Suspense} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./Components/custom/Header";
import { getSatelliteInfo } from "./api/satelliteDataApi";
// import earth from "./Components/earth/earth";

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
  const [satelliteData, setSatelliteData] = React.useState(null);

  const satelliteName = (satellite) => {
      setSatellite(satellite);
  };

  React.useEffect( async () => {
      setSatelliteData(await getSatelliteInfo(satellite.split(' ')[0]))
  }, [satellite]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header header={"Satellite Tracker"} selectedSatellite={satelliteName}/>
          {satellite}
          {satelliteData?.date}
          {/*<Suspense fallback={null}>*/}
          {/*    <earth position={[0, 0, 0]} />*/}
          {/*</Suspense>*/}
      </ThemeProvider>
  );
}