import deleteBtn from "./images/icon-cross.svg";

const Item  = ({ task, isComplete, handleClick }) => {
    return (
        <li className="toDo__list" onClick={handleClick} data-complete={isComplete} data-item={task}>
            <span className={`checkbox ${ isComplete ? 'checkbox--checked' : '' }`}></span>
            <p className={`toDo__text ${ isComplete ? 'toDo__text--checked' : '' }`}>{task}</p>

            <img className="toDo__remove" src={deleteBtn} alt="remove" />
        </li>
    )
}

export default Item;