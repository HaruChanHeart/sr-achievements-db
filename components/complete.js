import { useState, useEffect, useContext, useMemo } from 'react'
import { CompleteContext, JadeContext, ListContext } from '@/contexts/count'
import { Checkbox } from '@/components/ui/checkbox'
import { List } from 'lucide-react'

const JadeIndex = {
    "High": 20,
    "Mid": 10,
    "Low": 5
}

const CompleteButton = (props) => {
    const [ checked, setChecked ] = useState(false);
    const [ list, setList ] = useState(false);
    const [ mount, setMount ] = useState(false);
    const [ complete, setComplete ] = useContext(CompleteContext);
    const [ jade, setJade ] = useContext(JadeContext);
    const [ compList, setCompList ] = useContext(ListContext);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        setList(JSON.parse(localStorage.getItem('achievements')));
    }, [])

    const checkedItemHandler = (i, isChecked) => {
        let data = JSON.parse(localStorage.getItem('achievements'));
        let prevJade = jade;
        let prevComp = complete;
        let prevList = compList;
        data[i.Id] = isChecked;

        localStorage.setItem('achievements', JSON.stringify(data));
        setList(JSON.parse(localStorage.getItem('achievements')));

        if (isChecked === true) {
            prevJade[i.SeriesId] += JadeIndex[i.Rarity];
            prevList[i.SeriesId] += 1;
            prevComp += 1;
        }
        else {
            prevJade[i.SeriesId] -= JadeIndex[i.Rarity];
            prevList[i.SeriesId] -= 1;
            prevComp -= 1;
        }

        setJade(prevJade)
        setCompList(prevList)
        setComplete(prevComp)
    }

    const checkHandler = (value, data) => {
        if (!mount) return null;

        setChecked(!checked);
        checkedItemHandler(data, value);
    };

    return (
        <Checkbox className='w-10 h-10 border-zinc-400 dark:border-zinc-600' key={props.data.Id} checked={list[props.data.Id]} onCheckedChange={(e) => checkHandler(e, props.data)} />
    )
}

export default CompleteButton