import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import CompleteButton from '@/components/complete'
import CountComplete from './countcomplete'
import ListSkeleton from './list_skel'

const JadeCount = {
    "High": 20,
    "Mid": 10,
    "Low": 5
}

const Rarity = (props) => {
    return (
        <div className='flex'>
            <div className='flex items-center font-black text-right'>{JadeCount[props.rare]}</div>
            <div className='w-7 h-7 ml-3 bg-gradient-to-b bg-contain from-orange-400 to-orange-300 rounded-md stellar-jade'></div>
        </div>
    )
}


export default function AchievementList(props) {
    const [search, setSearch] = useState('');
    const [ comp, setComp ] = useState(false);
    const [ mount, setMount ] = useState(false);
    const [ filter, setFilter ] = useState('incomplete');

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        setComp(JSON.parse(localStorage.getItem('achievements')));
    }, [])

    const router = useRouter();
    const { cat } = router.query;

    const LS = () => { return <div className='md:col-span-2 grid grid-cols-1 gap-6'>{Array(8).fill(0).map((_, i) => <ListSkeleton key={i} />)}</div> };

    // Handle the error state
    if (props.error) return LS();

    // Handle the loading state
    if (!props.data) return LS();

    const currentCat = parseInt(cat) ? parseInt(cat) : 1

    //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
    const list = props.data.achievements.filter((value) => value.SeriesId === currentCat);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSelect = (value) => {
        setFilter(value);
    }

    const handleFilter = (item) => {
        switch (filter) {
            case 'incomplete':
                if (comp[item.Id] === true) return null;
                else return item;
            case 'complete':
                return comp[item.Id];
            case 'all':
                return item;
        }
    }

    return (
        <section className='md:col-span-2' >
            <div className='flex flex-col md:flex-row justify-center items-start md:items-center gap-4 mb-5'>
                <h1 className='text-3xl font-black shrink-0'>
                    <CountComplete count={list} id={currentCat} />
                </h1>
                <div className='w-full md:ml-auto'>
                    <Input id="search" type="text" placeholder="Achivement Title" className='w-full' onChange={handleSearch} />
                </div>
                <Select onValueChange={handleSelect} defaultValue={filter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Options" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="incomplete">Incomplete</SelectItem>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {list
                .filter((item) => handleFilter(item))
                .filter((item) =>
                item.Title
                    .includes(search))
                    .map((items) => (
                        <div key={items.Id} className='flex flex-row px-4 py-2 my-2 rounded-md border text-zinc-800 dark:text-white'>
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
                                <CompleteButton data={items} />
                            </div>
                        </div>
            ))}
        </section>
    )
}