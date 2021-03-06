import { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(null);

    //sets the theme state based on the device's color mode on the initial render
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme("dark")
        else setTheme("light"); 
    }, []);

    //updates ui theme based on state
    useEffect(() => {
        const bodyClass = document.body.classList;

        theme === "light" ? bodyClass.remove("dark-theme") : bodyClass.add("dark-theme");
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    )
}