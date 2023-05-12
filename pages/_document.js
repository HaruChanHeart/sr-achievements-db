import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body className='bg-slate-200 dark:bg-gray-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
