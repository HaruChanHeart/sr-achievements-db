import { useState, useEffect, useContext } from 'react'
import { CompleteContext } from '../../contexts/count'

const CompleteButton = (props) => {
    const [ checked, setChecked ] = useState(false);
    const [ list, setList ] = useState(false);
    const [ mount, setMount ] = useState(false);
    const [ complete, setComplete ] = useContext(CompleteContext);

    useEffect(() => {
        setMount(true);

        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify({}))
        }
        
        setList(JSON.parse(localStorage.getItem('achievements')));
    }, [])

    const checkedItemHandler = (id, isChecked) => {
        let data = JSON.parse(localStorage.getItem('achievements'));
        data[id] = isChecked;

        localStorage.setItem('achievements', JSON.stringify(data));
        setList(JSON.parse(localStorage.getItem('achievements')));

        if (isChecked === true) setComplete(complete + 1);
        if (isChecked === false) setComplete(complete - 1);
    }

    const checkHandler = ({ target }) => {
        if (!mount) return null;

        setChecked(!checked);
        checkedItemHandler(props.id, target.checked);
    };

    return (
        <input className='w-10 h-10' type="checkbox" key={props.id} checked={list[props.id]} onChange={(e) => checkHandler(e)} />
    )
}

export default CompleteButton