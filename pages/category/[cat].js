import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

import Header from '../components/header'
import Footer from '../components/footer'
import CompleteButton from '../components/complete'
import CountComplete from '../components/countcomplete'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

const Rarity = (props) => {
  const index = {
    "High": 20,
    "Mid": 10,
    "Low": 5
  }

  return (
    <div className='flex'>
      <div className='flex items-center font-black text-right'>{index[props.rare]}</div>
      <div className='w-7 h-7 ml-3 bg-gradient-to-b bg-contain from-orange-400 to-orange-300 rounded-md stellar-jade'></div>
    </div>
  )
}

export default function Achievements() {
  const [search, setSearch] = useState('');

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/data/ko', fetcher);

  const router = useRouter();
  const { cat } = router.query;

  //Handle the error state
  if (error) return <div>Failed to load</div>

  //Handle the loading state
  if (!data) return <div>Loading...</div>

  const lang = JSON.parse(data);

  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  const list = lang[cat];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <main>
      <Head>
        <title>스타레일 업적 사전</title>
        <meta property='description' content="'붕괴: 스타레일'의 업적들을 모아두었습니다." />
      </Head>
      <Header />
      <section className='p-10 mx-auto max-w-screen-xl'>
        <div className='flex flex-row justify-center items-center'>
          <h1 className='text-3xl font-black text-slate-800 dark:text-white'>
            <CountComplete count={list} />
          </h1>
          <label className='ml-auto text-slate-900 dark:text-white' htmlFor="search">
            <input className='bg-slate-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-0 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id="search" type="text" onChange={handleSearch} />
          </label>
        </div>
        {list.filter((item) => item.Title.includes(search)).map((items, index) => (
          <div key={items.Id} className='flex flex-row px-4 py-2 my-4 rounded-sm shadow-lg shadow-slate-300 bg-slate-100 text-slate-800 dark:bg-gray-900 dark:text-white dark:shadow-gray-900'>
            <div className='mr-auto'>
              <h3 className='text-xl font-black text-amber-600 dark:text-amber-200'>{items.Title}</h3>
              <p className='text-base font-semibold text-slate-700 dark:text-gray-300'>{items.Desc}</p>
              {items.SubDesc ? (<p className='text-sm text-slate-500 dark:text-gray-400'>{items.SubDesc}</p>) : null}
              {items.Hidden ? (<p className='text-sm font-black px-2 py-0.5 mt-1 mb-0.5 rounded-sm inline-block text-slate-600 bg-slate-300 dark:text-slate-400 dark:bg-slate-800'>히든 업적</p>) : null}
            </div>
            <div className='flex ml-3 justify-center items-center'>
              <Rarity rare={items.Rarity} />
            </div>
            <div className='flex ml-3 justify-center items-center'>
              <CompleteButton id={items.Id} />
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  )
}
