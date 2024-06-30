export default function Footer() {
    return (
        <footer className='container mx-auto max-w-7xl py-8 px-6 flex-grow'>
            <div className='w-full flex flex-col gap-1 items-center justify-center'>
                <h4 className='text-xl font-black'>스타레일 업적 사전 <sup>v0.8.0</sup></h4>
                <p>&copy;{new Date().getFullYear()} HaruChanHeart <span className='text-zinc-500'>|</span> 냉혈적인 하루</p>
                <p className='text-sm md:text-justify mt-2 text-zinc-500'>붕괴: 스타레일&trade;의 업적 데이터를 정리한 비공식 사이트이며 HoYoverse에 정식적으로 승인받지 않았습니다. 붕괴: 스타레일&trade;의 모든 저작권은 HoYoverse에 있습니다.</p>
            </div>
        </footer>
    )
}