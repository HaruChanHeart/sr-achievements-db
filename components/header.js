import { useRouter } from 'next/router';
import ModeToggle from '@/components/theme-switch';

const Header = () => {
    const router = useRouter();

    return (
        <header className='sticky top-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex h-14 items-center px-4 container'>
                <div className='font-bold'>스타레일 업적사전</div>
                {router.pathname !== "/" && (
                    <div className='flex flex-row justify-center items-center w-10 h-10'>
                        <div onClick={() => router.back()}>&lt;</div>
                    </div>
                )}
                <div className='ml-auto'>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header