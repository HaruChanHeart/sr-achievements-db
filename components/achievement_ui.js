import useSWR from 'swr';

import SideBar from '@/components/sidebar'
import AchievementList from '@/components/achievements_list'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AchievementUI() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/ko/data', fetcher);

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-10 p-2 md:p-5 mx-auto max-w-screen-xl'>
      <SideBar className='w-full' data={data} error={error} />
      <AchievementList data={data} error={error} />
    </div>
  )
}
