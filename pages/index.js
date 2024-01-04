import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import Header from '@/components/header'
import Footer from '@/components/footer'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/list/ko', fetcher)
  
  //Handle the error state
  if (error) return <div>Failed to load</div>

  //Handle the loading state
  if (!data) return <div>Loading...</div>

  const lang = JSON.parse(data)

  return (
    <main>
      <Head>
        <title>스타레일 업적 사전</title>
        <meta property='description' content="'붕괴: 스타레일'의 업적들을 모아두었습니다." />
      </Head>
      <Header />
      <aside>
        <div className='p-10 mx-auto max-w-screen-xl'>
          {lang.map((items, index) => (
            <Link key={index} href={`/category/${items.id}`}>
              <div className='flex flex-col px-4 py-2 my-2 rounded-md border'>
                <h3 className='text-xl font-black'>{items.title}</h3>
                <div className='flex flex-row text-base font-semibold text-zinc-500 dark:text-zinc-400'>
                  <div>업적 개수: {items.count}</div>
                  <div className='ml-auto text-right'>성옥: {items.totaljade}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </aside>
      <Footer />
    </main>
  )
}
