import { useRouter } from 'next/router';
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const Header = () => {
    const router = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const RenderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return (
                <div className='flex flex-row justify-center ml-auto items-center w-10 h-10 fill-yellow-500' onClick={() => setTheme('light')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M4.069 13H0v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312L4.222 2.807 2.808 4.221l2.881 2.881a8.019 8.019 0 0 1 1.414-1.414zm11.209 1.414 2.881-2.881-1.414-1.414-2.881 2.881a8.121 8.121 0 0 1 1.414 1.414zM12 4c.339 0 .672.028 1 .069V0h-2v4.069A8.047 8.047 0 0 1 12 4zm0 16c-.339 0-.672-.028-1-.069V24h2v-4.069A8.047 8.047 0 0 1 12 20zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1H24v-2h-4.069zm-3.033 7.312 2.88 2.88 1.415-1.414-2.88-2.88a8.127 8.127 0 0 1-1.415 1.414zm-11.21-1.415-2.88 2.88 1.414 1.414 2.88-2.88a8.053 8.053 0 0 1-1.414-1.414zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>
                </div>
            )
        }
        else {
            return (
                <div className='flex flex-row justify-center ml-auto items-center w-10 h-10 fill-slate-800' onClick={() => setTheme('dark')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.685 21.965C15.89 19.811 18 16.152 18 12s-2.11-7.811-5.315-9.965C17.887 2.388 22 6.708 22 12s-4.113 9.612-9.315 9.965z"/></svg>
                </div>
            )
        }
    }

    const BackButton = () => {
        return (
            <div className='flex flex-row justify-center items-center w-10 h-10 text-slate-800 dark:text-white'>
                <div onClick={() => router.back()}>Back</div>
            </div>
        )
    }

    return (
        <header className='sticky top-0'>
            <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-slate-700 shadow-lg shadow-slate-700/25'>
                <div className='flex flex-row justify-left items-center mx-auto max-w-screen-xl'>
                    {router.pathname !== "/" && (
                        BackButton()
                    )}
                    {RenderThemeChanger()}
                </div>
            </nav>
        </header>
    )
}

export default Header