import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

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

  // Handle the error state
  if (error) return <div>Failed to load</div>

  // Handle the loading state
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
        <div className='flex flex-row justify-center items-center gap-4 mb-5'>
          <h1 className='text-3xl font-black w-[180px]'>
            <CountComplete count={list} />
          </h1>
          <div className='ml-auto'>
            <Input id="search" type="text" placeholder="Achivement Title" className='w-full' onChange={handleSearch} />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {list.filter((item) => item.Title.includes(search)).map((items) => (
          <div key={items.Id} className='flex flex-row px-4 py-2 my-2 rounded-md border text-slate-800 dark:text-white'>
            <div className='mr-auto'>
              <h3 className='text-xl font-black'>{items.Title}</h3>
              <p className='text-base font-semibold text-zinc-500 dark:text-zinc-400'>{items.Desc}</p>
              {items.SubDesc ? (<p className='text-sm text-zinc-600 dark:text-zinc-500'>{items.SubDesc}</p>) : null}
              {items.Hidden ? (<Badge variant="outline">히든 업적</Badge>) : null}
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
