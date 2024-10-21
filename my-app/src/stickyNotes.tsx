import React, { useState, useEffect} from 'react';
import './App.css';
import './hooksExercise.tsx';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { Favorite } from "./hooksExercise";


export const StickyNotes = () => {
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const [currentTheme, setCurrentTheme] = useState("light");

  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };
  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote); 

  const updateNoteHandler = (id: number, key: keyof Note, value: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, [key]: value } : note
    ));
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const toggleFav = (id: number) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note =>
        note.id === id ? {...note, isFavorite: !note.isFavorite} : note
      );
      return updatedNotes;
    })
  }

  useEffect(() => {
    const favorites = notes.filter(note=>note.isFavorite).map(note=>note.title);
    setFavoriteNames(favorites);
    console.log("List of Favorites:", favorites);
  }, [notes]);

  return (
    <div className={currentTheme}>
      <button style= {{marginLeft: '45px'}}onClick={toggleTheme}> Toggle Theme </button>
      <div className='app-container'>
        <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input 
              placeholder="Note Title" 
              value = {createNote.title}
              onChange={(event)=>
              setCreateNote({...createNote, title:event.target.value})} 
              required>
              </input>
            </div>

            <div>
              <textarea 
              placeholder="Note Content"
              value = {createNote.content}
              onChange={(event)=> 
              setCreateNote({...createNote, content:event.target.value})} 
              required>
              </textarea>
            </div>

            <div>
              <select 
              value = {createNote.label}
              onChange={(event)=>
              setCreateNote({...createNote, label:event.target.value as Label})}
              required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>

            <div><button type="submit">Create Note</button></div>
        </form>
          <div className="notes-grid">
            {notes.map(note => (
            <div 
            key={note.id} 
            className="note-item" data-testid = {`note-container-${note.id}`}>
              <div className="notes-header">
                <Favorite noteId={note.id} isFavorite={note.isFavorite} toggleFav={toggleFav}/> 
                <button data-testid =  {`delete-note-${note.id}`} onClick={() => deleteNoteHandler(note.id)}>x</button>
              </div>

              <div contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateNoteHandler(note.id, 'title', e.target.innerText)}
                data-testid = {`note-title-${note.id}`}>
                <h2>{note.title}</h2>
              </div>
              <div contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateNoteHandler(note.id, 'content', e.target.innerText)}
                data-testid = {`note-content-${note.id}`}>
                  <p>{note.content}</p>
              </div>
              <div contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateNoteHandler(note.id, 'label', e.target.innerText)}>
                  <p>{note.label}</p>
              </div>
            </div>
            ))}
          </div>  
          <div className="favorites">
            <h3>List of Favorites: </h3>
            <ul>
              {favoriteNames.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};
