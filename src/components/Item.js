import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ThemeContext } from "../context/ThemeContext";
import deleteBtn from "../images/icon-cross.svg";

const Item  = ({ id, task, isComplete, handleClick, index }) => {
    const [theme] = useContext(ThemeContext);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <li 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="toDo__list" 
                    onClick={handleClick} 
                    data-complete={isComplete} 
                    data-id={id}
                    style={{ 
                        background: 
                          snapshot.isDragging && theme === "dark" ? "hsl(235, 17%, 14%)"
                        : snapshot.isDragging && theme === "light" ? "rgb(235, 235, 235)"
                        : "none",
                         
                        ...provided.draggableProps.style 
                    }}
                >
                    <span className={`checkbox ${ isComplete ? 'checkbox--checked' : '' }`}></span>
                    <p className={`toDo__text ${ isComplete ? 'toDo__text--checked' : '' }`}>{task}</p>
        
                    <img className="toDo__remove" src={deleteBtn} alt="remove" />
                </li>
            )}
        </Draggable>
    )
}

export default Item;