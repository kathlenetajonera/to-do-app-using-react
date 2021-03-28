import { Draggable } from "react-beautiful-dnd";
import deleteBtn from "../images/icon-cross.svg";

const Item  = ({ task, isComplete, handleClick, index, theme }) => {
    return (
        <Draggable draggableId={task} index={index}>
            {(provided, snapshot) => (
                <li 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="toDo__list" 
                    onClick={handleClick} 
                    data-complete={isComplete} 
                    data-item={task}
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