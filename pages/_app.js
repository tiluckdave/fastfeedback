import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo';
import { Global, css } from '@emotion/react'

import { AuthProvider } from '@/lib/auth'
import customTheme from '@/styles/theme'
import SEO from '../next-seo.config';
import Head from 'next/head';
import Script from "next/script";
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
          }
        `}
      />
      {children}
    </>
  );
};

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [ router.events ])


  return <ChakraProvider theme={customTheme}>
    <GlobalStyle />
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      <Script id="google-analytics-script" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
}

export default App
