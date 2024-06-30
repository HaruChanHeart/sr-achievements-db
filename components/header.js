// import { useRouter } from 'next/router';
import ModeToggle from '@/components/theme-switch';
import LangToggle from './lang-switch';

const Header = () => {
    // const router = useRouter();

    return (
        <header className='sticky top-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex h-14 items-center px-4 container'>
                <div className='font-bold'>스타레일 업적 사전</div>
                <div className='ml-auto flex flex-row justify-end gap-2'>
                    <LangToggle />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header