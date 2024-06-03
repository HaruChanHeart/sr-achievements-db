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

    return (
        <span>{compList[props.id]}</span>
    )
}

export default CountComplete