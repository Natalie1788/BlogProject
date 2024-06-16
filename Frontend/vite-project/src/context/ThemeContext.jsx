import { createContext, useState, useContext } from "react";

// ----------------------------------creating context----------------------
export const ThemeContext = createContext(undefined) 


//--------------------------------------- theme hook----------------------
export const useTheme = () => {
    const thcontext = useContext(ThemeContext)

    if (!thcontext) {
        throw new Error ("context error")
    }
    return thcontext;
}

//-------------------------------------- hook wrapper-------------------------
export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(true)

    const toggleTheme = () => {
      setIsDark((prev)=>!prev)
    };

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}