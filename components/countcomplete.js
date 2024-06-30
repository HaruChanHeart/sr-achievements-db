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

    const achievement_total = props.count.filter(i => i.SeriesId === parseInt(props.id)).length;

    const bgColor = (c1, c2) => {
        switch (true) {
            case c1 === c2:
                return 'bg-emerald-700'
            case c1 >= c2 / 2:
                return 'bg-yellow-700';
            case c1 >= c2 / 5:
                return 'bg-rose-800';
            default:
                return 'bg-zinc-700';
        }
    }

    const percentUI = (c1, c2) => {
        return <span className={`ml-2 px-2 text-xs ${bgColor(c1, c2)} text-white rounded-full`}>{((c1 / c2) * 100).toFixed(2)}%</span>
    }

    return (
        <div className='flex flex-row justify-start items-baseline'>
            <span>{compList[props.id]} / {achievement_total}</span>
            {props.showpercent ? percentUI(compList[props.id], achievement_total) : null}
        </div>
    )
}

export default CountComplete