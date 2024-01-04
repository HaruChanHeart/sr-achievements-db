import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from '@/components/theme-provider'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous" />
        <link rel="preload" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css" />
      </Head>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  )
}
