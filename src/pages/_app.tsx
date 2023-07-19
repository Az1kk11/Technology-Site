import 'src/styles/globals.css'
import 'nprogress/nprogress.css'

import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/helpers/create-emotion-cashe';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/helpers/theme';
import { CssBaseline } from '@mui/material'
import NProgress from 'nprogress';
import React, { useEffect } from 'react'

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    
    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
    router.events.off('routeChangeComplete', handleRouteDone);
    router.events.off('routeChangeError', handleRouteDone);
    };
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp