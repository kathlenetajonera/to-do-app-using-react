import { useState } from "react";

const InputField = ({ toDoList, setToDoList }) => {
    const [toDo, setToDo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (toDoList.length === 0) {
            setToDoList([{ item: toDo, isComplete: false }]);
            setToDo('')
        } else {
            const isUnique = toDoList.every(list => list.item !== toDo)
            
            //check if item is unique & not yet existing on the list
            if (isUnique) {
                setToDoList(prev => prev.concat({ item: toDo, isComplete: false }))
                setToDo('')
            } else {
                const existingItem = toDoList.find(list => list.item === toDo);
                // const existingIndex = toDoList.indexOf(existingItem)

                console.log(existingItem);
            }
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