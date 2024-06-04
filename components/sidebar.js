import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { CaretSortIcon } from '@radix-ui/react-icons'

import {
    Button
} from '@/components/ui/button'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useEffect, useState } from 'react'
import JadeCount from './jadecount'
import CountComplete from './countcomplete'
import ListSkeleton from './list_skel'

const JadeIndex = {
    "High": 20,
    "Mid": 10,
    "Low": 5
}

export default function SideBar(props) {
    // check width size
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [isOpen, setIsOpen] = useState(true);
    const [comp, setComp] = useState(false);
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }

        setComp(JSON.parse(localStorage.getItem('achievements')));
    }, [])

    useEffect(() => {
        isMobile ? setIsOpen(false) : setIsOpen(true)
    }, [isMobile])

    //Handle the error state
    if (props.error) return <div className='w-full grid grid-cols-1 gap-8'>{Array(9).fill(0).map((_) => <ListSkeleton key={_} category={true} />)}</div>;

    //Handle the loading state
    if (!props.data) return <div className='w-full grid grid-cols-1 gap-8'>{Array(9).fill(0).map((_) => <ListSkeleton key={_} category={true} />)}</div>;

    const lang = props.data.series
    const achievements = props.data.achievements

    const TotalCount = (seriesId, jade) => {
        let count = 0
        if (jade) achievements.filter((value) => value.SeriesId === seriesId).forEach((value) => {
            count += JadeIndex[value.Rarity]
        })
        else count = achievements.filter((value) => value.SeriesId === seriesId).length

        return count
    }

    return (
        <aside>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
                <CollapsibleTrigger asChild className='w-full md:hidden'>
                    <Button variant='ghost' size='sm'>
                        <CaretSortIcon className="h-4 w-4" />
                        <span className='sr-only'>Toggle</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {lang.map((items, index) => (
                        <Link key={index} href={`/category/${items.id}`}>
                            <div className='flex flex-col px-4 py-2 my-2 rounded-md border'>
                                <h3 className='text-xl font-black'>{items.title}</h3>
                                <div className='flex flex-row text-base font-semibold text-zinc-500 dark:text-zinc-400'>
                                    <span><CountComplete count={achievements} id={items.id} /> / {TotalCount(items.id)}</span>
                                    <div className='ml-auto text-right'>
                                        <div className='flex space-x-1 items-center'>
                                            <span><JadeCount count={achievements} id={items.id} /> / {TotalCount(items.id, true)}</span>
                                            <div className='w-6 h-6 bg-gradient-to-b bg-contain from-orange-400 to-orange-300 rounded-md stellar-jade'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </aside>
    )
}