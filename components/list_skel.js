import { Skeleton } from './ui/skeleton';

const Skel_Achievement = () => {
    return (
        <div className='flex flex-row justify-start items-center gap-10 px-4 py-2'>
            <div className='flex flex-col justify-center items-start w-full gap-2'>
                <Skeleton className='w-8/12 h-[10px] rounded-full' />
                <Skeleton className='w-full h-[10px] rounded-full' />
            </div>
            <Skeleton className='shrink-0 w-[40px] h-[40px] rounded-full' />
        </div>
    )
}

const Skel_Category = () => {
    return (
        <div className='flex flex-col w-full justify-center items-start gap-2 px-4 py-2'>
            <Skeleton className='w-32 h-[10px] rounded-full' />
            <div className='flex flex-row w-full justify-between'>
                <Skeleton className='w-12 h-[10px] rounded-full' />
                <div className='flex flex-row gap-2'>
                    <Skeleton className='w-16 h-[10px] rounded-full' />
                    <Skeleton className='w-[20px] h-[10px] rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default function ListSkeleton(props) {
    return (
        props.category ? Skel_Category() : Skel_Achievement()   
    )
}