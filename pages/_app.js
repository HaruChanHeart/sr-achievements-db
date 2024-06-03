import '@/styles/globals.css'
import '@/public/font/SUITE.css'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { CompleteContext, JadeContext, ListContext } from '../contexts/count'

export default function App({ Component, pageProps }) {
  const [ complete, setComplete ] = useState(0)
  const [ jade, setJade ] = useState({})
  const [ compList, setCompList ] = useState({})

  return (
    <CompleteContext.Provider value={[complete, setComplete]}>
      <ListContext.Provider value={[compList, setCompList]}>
        <JadeContext.Provider value={[jade, setJade]}>
          <ThemeProvider attribute='class'>
            <Component {...pageProps} />
          </ThemeProvider>
        </JadeContext.Provider>
      </ListContext.Provider>
    </CompleteContext.Provider>
  )
}
