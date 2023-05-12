import { useState, useEffect, useContext } from 'react'
import { CompleteContext } from '../../contexts/count'

const CountComplete = (props) => {
    const [ mount, setMount ] = useState(false);
    const [ count, setCount ] = useState(false);
    const [ complete, setComplete ] = useContext(CompleteContext);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        const list = JSON.parse(localStorage.getItem('achievements'));
        let countVal = 0;
        
        for (const i of Object.keys(list)) {
            for (const j of props.count) {
                if (i === j.Id.toString()) {
                    if (list[i] === true) countVal++;
                }
            }
        }

        setComplete(countVal);
        setCount(Object.keys(props.count).length);
    }, [props.count, setComplete])

    return (
        <span>{complete} / {count}</span>
    )
}

export default CountComplete