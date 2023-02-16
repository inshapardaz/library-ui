import { createContext, useState, useEffect, useContext } from "react"

const ThemeContext = createContext({

})

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() =>  {
        const mode = localStorage.getItem('ui-dark-mode');
        setDarkMode (mode)
    }, [])

    const setThemeMode = (dark) => {
        setDarkMode (dark)
    }

    return (
      <ThemeContext.Provider value={{ darkMode, setThemeMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };

  export const useThemeContext = () => useContext(ThemeContext)