import useSWR from 'swr';
import { useEffect, useState } from 'react';

import SideBar from '@/components/sidebar'
import AchievementList from '@/components/achievements_list'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AchievementUI() {
  const [mount, setMount] = useState(false);
  const [lang, setLang] = useState('');

  useEffect(() => {
      setMount(true);

      if (!localStorage.getItem('lang_setting')) {
          localStorage.setItem('lang_setting', 'en')
      }

      const i = localStorage.getItem('lang_setting');

      setLang(i !== '' ? i : 'en');
  }, []);

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR(`/api/data/${lang ? lang : 'en'}`, fetcher);

  return (
    <div className='w-full h-full grow grid xs:grid-cols-1 md:grid-cols-3 gap-10 p-2 md:p-5 mx-auto max-w-screen-xl'>
      <SideBar className='w-full' data={data} error={error} />
      <AchievementList data={data} error={error} />
    </div>
  )
}
