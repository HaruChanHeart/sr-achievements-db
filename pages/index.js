import Head from 'next/head'

import Header from '@/components/header'
import Footer from '@/components/footer'
import AchievementUI from '@/components/achievement_ui'

export default function Home() {
  return (
    <main>
      <Head>
        <title>스타레일 업적 사전</title>
        <meta property='description' content="'붕괴: 스타레일'의 업적들을 모아두었습니다." />
      </Head>
      <Header />
      <AchievementUI />
      <Footer />
    </main>
  )
}
