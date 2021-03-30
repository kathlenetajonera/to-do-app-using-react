import { useState, useEffect } from "react";

const InputField = ({ toDoList, setToDoList }) => {
    const [toDo, setToDo] = useState('');
    const [id, setId] = useState(0);

    //retrieves the id in localStorage
    useEffect(() => {
        if (localStorage.getItem("id")) {
            setId(parseInt(localStorage.getItem("id")))
        }
    }, [])

    //saves id in localStorage, to avoid duplication
    useEffect(() => {
        localStorage.setItem("id", id);
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        setId(prev => prev + 1);

        if (toDoList.length === 0) {
            setToDoList([{ id, item: toDo, isComplete: false }]);
            setToDo('')
        } else {
            setToDoList(prev => prev.concat({ id, item: toDo, isComplete: false }));
            setToDo('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="header__form">
            <span className="checkbox checkbox--form"></span>
            <input
                onChange={e => setToDo(e.target.value)}
                value={toDo}
                className="header__input" 
                type="text" 
                placeholder="Create a new todo..."
            />
        </form>
    );
}
 
export default InputField;