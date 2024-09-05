import React, { createContext, useContext, useState } from 'react';
const ThemeContext = createContext('light');

export default function Mode() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const themeColors = {
        light: '#ffffff',
        dark: '#333333'
    };

    return (
        <>
            <ThemeContext.Provider value={themeColors[theme]}>
                <Form />
            </ThemeContext.Provider>
            <Button onClick={toggleTheme} style={{color:'#333333'}}>
                Toggle theme
            </Button>
            <h1>Value changed to {theme}</h1>
        </>
    );
}

function Form({ children }) {
    return (
        <Panel title="Welcome">
            <Button>Sign up</Button>
            <Button>Log in</Button>
        </Panel>
    );
}

function Panel({ title, children }) {
    const theme = useContext(ThemeContext);
    const color = (theme === '#ffffff'?'#333333' : '#ffffff');
    return (
        <section style={{ backgroundColor: theme ,color : color}}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}

function Button({ children, onClick }) {
    const theme = useContext(ThemeContext)
    // const color = (theme === '#ffffff'?'#333333' : '#ffffff');
    return (
         <button style={{ backgroundColor: theme }} onClick={onClick}>
            {children}
        </button>
    );
}
