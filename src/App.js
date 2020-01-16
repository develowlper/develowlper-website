import React, { useState, useEffect } from 'react';
import './styles.css';
import { Box, Typography, CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { useSpring, animated, config } from 'react-spring';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8DE2DB',
    },
    background: {
      default: '#6D2243',
    },
  },
  typography: {
    fontFamily: 'Nova Slim',
  },
});

const AniFeGaussianBlur = animated('feGaussianBlur');
const AniTypography = animated(Typography);

export default function App() {
  const [toggle, setToggle] = useState(false);

  const { fontSize, blur } = useSpring({
    fontSize: toggle ? '16px' : '96px',
    blur: toggle ? 5 : 0,
    config: toggle ? config.slow : config.wobbly,
  });

  useEffect(() => {
    const id = setTimeout(() => setToggle(!toggle), toggle ? 1000 : 3000);
    return () => clearTimeout(id);
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <svg widht="0" height="0">
          <defs>
            <filter id="blur">
              <AniFeGaussianBlur stdDeviation={blur} in="SourceGraphic" />
            </filter>
          </defs>
        </svg>
        <Box
          display="flex"
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
          px={2}
        >
          <AniTypography
            style={{ filter: 'url(#blur)', fontSize }}
            color="primary"
            variant="h1"
            align="center"
          >
            <animated.span>I am develowlper!</animated.span>
          </AniTypography>
        </Box>
      </ThemeProvider>
    </div>
  );
}
