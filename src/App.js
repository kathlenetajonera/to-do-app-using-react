import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from './components/Header';
import Container from "./components/Container";
import Footer from "./components/Footer";
import "./css/App.css"

function App() {
  const [toDoList, setToDoList] = useState([]);

  //retrieves list from localStorage on initial render
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
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
