import Head from 'next/head'

import Header from '@/components/header'
import Footer from '@/components/footer'
import SideBar from '@/components/sidebar'
import AchievementList from '@/components/achivements'

export default function Achievements() {
  return (
    <main>
      <Head>
        <title>스타레일 업적 사전</title>
        <meta property='description' content="'붕괴: 스타레일'의 업적들을 모아두었습니다." />
      </Head>
      <Header />
      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-10 p-2 md:p-5 mx-auto max-w-screen-xl'>
        <SideBar className='w-full' />
        <AchievementList className='md:col-span-2' />
      </div>
      <Footer />
    </main>
  )
}
