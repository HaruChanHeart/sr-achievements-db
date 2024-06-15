import { useState, useEffect, useContext } from 'react'
import { CompleteContext, ListContext } from '../contexts/count'

const CountComplete = (props) => {
    const [ mount, setMount ] = useState(false);
    const [ count, setCount ] = useState(0);
    const [ complete, setComplete ] = useContext(CompleteContext);
    const [ compList, setCompList ] = useContext(ListContext);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        const list = JSON.parse(localStorage.getItem('achievements'));
        let countVal = 0;

        const achievements = props.count;
        const series = props.id;
        let prevComp = compList;

        Object.entries(list).forEach(value => {
            const aid = parseInt(value[0]);
            if (achievements.filter(i => i.SeriesId === parseInt(series)).find(i => i.Id === aid) && value[1] === true) {
                const d = achievements.find(i => i.Id === aid);
                countVal++
            }
        })

        prevComp[series] = countVal

        setCount(countVal);
        setCompList(prevComp);
    }, [count, setCompList])

    const achievement_total = props.count.filter(i => i.SeriesId === parseInt(props.id)).length

    return (
        <div className='flex flex-row justify-start items-baseline'>
            <span>{compList[props.id]} / {achievement_total}</span>
            {props.showpercent ? <span className='ml-2 px-2 text-xs bg-zinc-700 text-white rounded-full'>{((compList[props.id] / achievement_total) * 100).toFixed(2)}%</span> : null}
        </div>
    )
}

export default CountComplete