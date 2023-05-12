import '@/styles/globals.css'
import '@/public/font/SUITE.css'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { CompleteContext } from '../contexts/count'

export default function App({ Component, pageProps }) {
  const [ complete, setComplete ] = useState(0)

  return (
    <CompleteContext.Provider value={[complete, setComplete]}>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
    </CompleteContext.Provider>
  )
}
