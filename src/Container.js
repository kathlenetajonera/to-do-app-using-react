import { useEffect, useState, useRef } from "react";
import Item from "./Item";
import Options from "./Options";

const Container = ({ toDoList, setToDoList }) => {
    const [listToRender, setListToRender] = useState(null);

    //updates the list to render everytime there's changes on the toDoList
    useEffect(() => {
        setListToRender(toDoList);
    }, [toDoList])

    const handleClick = (e) => {
        if (e.target.tagName.toLowerCase() === "img") {
            const taskToDelete = e.target.parentElement.dataset.item;
            const updatedList = toDoList.filter(task => task.item !== taskToDelete)

            setToDoList(updatedList);
            console.log("deleted");
        } else {
            const selectedItem = e.target.dataset.item;
            const updatedList = toDoList.map(list => {
                if (list.item === selectedItem) {
                    list.isComplete ? list.isComplete = false : list.isComplete = true;
                }
    
                return list;
            })
    
            setToDoList(updatedList);
            console.log("updated");
        }
    }

    const filterList = (ev) => {
        const filterButtons = document.querySelectorAll(".options__category");
        const filterBy = ev.target.dataset.value;
        const render = (list) => {
            filterButtons.forEach(btn => btn.classList.remove("options__category--active"));

            ev.target.classList.add("options__category--active");
            setListToRender(list);
        }

        if (filterBy === "active") {
            const activeList = toDoList.filter(list => list.isComplete === false);
            render(activeList)
        } else if (filterBy === "completed") {
            const completedList = toDoList.filter(list => list.isComplete === true);
            render(completedList)
        } else render(toDoList);
    }

    return (
        <div className="container">
            <div className="container__inner">
                <ul className="toDo">
                    {listToRender && listToRender.map(list => {
                        return (
                            <Item 
                                task={list.item} 
                                isComplete={list.isComplete} 
                                handleClick={handleClick}
                                key={list.item} />
                            )
                    })} 
                </ul>   
                
                {listToRender === null || listToRender.length === 0 ? '' : <Options filterList={filterList} />}
            </div>
        </div>
    )
}

export default Container;