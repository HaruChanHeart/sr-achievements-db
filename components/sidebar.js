import useSWR from 'swr'
import Link from 'next/link'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SideBar() {
    //Set up SWR to run the fetcher function when calling "/api/staticdata"
    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    const { data, error } = useSWR('/api/list/ko', fetcher)

    //Handle the error state
    if (error) return <div>Failed to load</div>

    //Handle the loading state
    if (!data) return <div>Loading...</div>

    const lang = JSON.parse(data)

    return (
        <aside>
            {lang.map((items, index) => (
                <Link key={index} href={`/category/${items.id}`}>
                    <div className='flex flex-col px-4 py-2 my-2 rounded-md border'>
                        <h3 className='text-xl font-black'>{items.title}</h3>
                        <div className='flex flex-row text-base font-semibold text-zinc-500 dark:text-zinc-400'>
                            <div>업적 개수: {items.count}</div>
                            <div className='ml-auto text-right'>성옥: {items.totaljade}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </aside>
    )
}