import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import Options from "./Options";

const Container = ({ theme, toDoList, setToDoList }) => {
    const [listToRender, setListToRender] = useState(null);
    const [filter, setFilter] = useState(null);
    const filterButtons = document.querySelectorAll(".options__category");

    //updates the list to render everytime there's changes on the toDoList
    useEffect(() => {
        if (filter === null) {
            setListToRender(toDoList)
        } else {
            const render = (list) => {
                const selectedButton = [...filterButtons].find(btn => btn.dataset.value === filter);
    
                filterButtons.forEach(btn => btn.classList.remove("options__category--active"));
                selectedButton.classList.add("options__category--active");

                setListToRender(list);
            }

            if (filter === "active") {
                const activeList = toDoList.filter(list => list.isComplete === false);
                render(activeList)
            } else if (filter === "completed") {
                const completedList = toDoList.filter(list => list.isComplete === true);
                render(completedList)
            } else render(toDoList);
        }
  
    }, [toDoList, filter])

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

    const clearCompleted = () => {
        const activeList = toDoList.filter(list => list.isComplete === false); //returns the incomplete tasks

        setToDoList(activeList);
    }

    const handleOnDragEnd = result => {
        //return if dragged outside the droppable
        if (!result.destination) return;

        //return if dragged on the same position
        if (result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index) return;

        //creates a copy of the todoList state
        const updatedList = toDoList.slice(0);
        const draggedItem = updatedList[result.source.index]

        //removes the draggedItem on the initial position and inserts to the new position
        updatedList.splice(result.source.index, 1);
        updatedList.splice(result.destination.index, 0, draggedItem);

        setToDoList(updatedList);
    }

    return (
        <div className="container">
            <div className="container__inner">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="list-items">
                        {provided => (
                        <ul className="toDo" 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
     
                            {listToRender && listToRender.map((list, index) => {
                                return (
                                    <Item 
                                    task={list.item} 
                                    isComplete={list.isComplete} 
                                    handleClick={handleClick}
                                    index={index}
                                    theme={theme}
                                    key={list.item}
                                    />
                                )
                            })} 

                            {provided.placeholder}
                        </ul>                          
                        )}

                    </Droppable>
                </DragDropContext>
                
                {toDoList.length === 0 ? '' 
                : <Options 
                    setFilter={setFilter}
                    clearCompleted={clearCompleted}
                />}
            </div>
        </div>
    )
}

export default Container;