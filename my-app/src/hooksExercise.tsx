import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module

export function ClickCounter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title= `You clicked ${count} times`;
    }, [count]);

    return (
        <div
            style={{
            background: theme.background,
            color: theme.foreground,
            padding: "20px",
            }}>
            <p>You clicked {count} times </p>
            <button
            onClick={() => setCount(count + 1)}
            style={{ background: theme.foreground, color: theme.background }}>
            Click me
            </button>
        </div>
    );
}

export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        <ClickCounter />
      </ThemeContext.Provider>
    );
   }

interface properties{
    noteId: number;
    isFavorite: boolean;
    toggleFav: (id:number)=>void;
}

export function Favorite({noteId, isFavorite, toggleFav}: properties){
    const togg = ()=> {
        toggleFav(noteId);
    }

    return (
        <button className = {`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={() => toggleFav(noteId)}>
          {isFavorite ? '❤️' : '♡'}
        </button>
      );
}