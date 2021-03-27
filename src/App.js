import { useState, useEffect } from "react";
import "./css/App.css"
import Header from './Header';
import Container from "./Container";
import Footer from "./Footer";

function App() {
  const [toDoList, setToDoList] = useState([]);

  //retrieves list from localStorage
  useEffect(() => {
    if (localStorage.getItem("toDoList")) {
      const savedList = JSON.parse(localStorage.getItem("toDoList"));
      setToDoList(savedList);
    }
  }, [])

  //saves the list to localStorage
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList])

  return (
    <div className="App">
      <Header 
        toDoList={toDoList} 
        setToDoList={setToDoList}
      />
      <Container 
        toDoList={toDoList} 
        setToDoList={setToDoList} 
      />
      <Footer />
    </div>
  );
}

export default App;
