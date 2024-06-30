import { useState, useEffect, useContext } from 'react'
import { JadeContext } from '@/contexts/count'

const JadeIndex = {
    "High": 20,
    "Mid": 10,
    "Low": 5
}

const JadeCount = (props) => {
    const [ mount, setMount ] = useState(false);
    const [ count, setCount ] = useState(0);
    const [ jade, setJade ] = useContext(JadeContext);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        const list = JSON.parse(localStorage.getItem('achievements'));
        let countVal = 0;

        const achievements = props.count;
        const series = props.id;
        let prevJade = jade;

        Object.entries(list).forEach(value => {
            const aid = parseInt(value[0]);
            if (achievements.filter(i => i.SeriesId === parseInt(series)).find(i => i.Id === aid) && value[1] === true) {
                const d = achievements.find(i => i.Id === aid);
                countVal += JadeIndex[d.Rarity]
            }
        })

        prevJade[series] = countVal;

        setJade(prevJade);
    }, [jade])

    return (
        <span>{jade[props.id]}</span>
    )
}

export default JadeCount