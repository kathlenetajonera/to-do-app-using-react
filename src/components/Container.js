import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import Options from "./Options";

const Container = ({ theme, toDoList, setToDoList }) => {
    const [listToRender, setListToRender] = useState(null);
    const [filter, setFilter] = useState(null);
    const [remainingTaskCount, setRemainingTaskCount] = useState(null);
    const filterButtons = document.querySelectorAll(".options__category");

    //updates remaining task count every render
    useEffect(() => {
        const incompleteTasksCount = toDoList.filter(list => list.isComplete === false).length;

        setRemainingTaskCount(incompleteTasksCount);
    })

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

        console.log("render");
  
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

        const toDoListCopy = toDoList.slice(0);
        const renderList = listToRender.slice(0);
        
        //in All tab list, mutate the list as is
        if (toDoListCopy.length === renderList.length) {
            const draggedItem = toDoListCopy[result.source.index];

            //removes the draggedItem on the initial position and inserts to the new position
            toDoListCopy.splice(result.source.index, 1);
            toDoListCopy.splice(result.destination.index, 0, draggedItem);

            setToDoList(toDoListCopy);
            console.log(toDoListCopy);
        } else {

            //in Active/Completed tab lists, get the source & destination index from the render list, then match on the original list
            const adjustedDestinationIndex = toDoListCopy.indexOf(renderList[result.destination.index]);
            const adjustedSourceItem = toDoListCopy.find(list => list.item === renderList[result.source.index].item)
            const adjustedSourceIndex = toDoListCopy.indexOf(adjustedSourceItem);
            
            toDoListCopy.splice(adjustedSourceIndex, 1); //removes the item from the original position
            toDoListCopy.splice(adjustedDestinationIndex, 0, adjustedSourceItem); //inserts the dragged item on the destination index
            
            setToDoList(toDoListCopy);
            console.log(toDoListCopy);
        }
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
                    remainingTaskCount={remainingTaskCount}
                />}
            </div>
        </div>
    )
}

export default Container;