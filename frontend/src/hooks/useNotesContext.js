import { NotesContext } from "../context/NotesContext";
import { useContext } from 'react';

export const useNoteContext = () => {
    const context = useContext(NotesContext);

    if (!context) {
        throw Error('useNoteContext must be used inside a NoteContextProvider');
    }

    return context;
};