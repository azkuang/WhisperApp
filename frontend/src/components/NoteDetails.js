import { useNoteContext } from "../hooks/useNotesContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
const NoteDetails = ({ note }) => {

    const { dispatch } = useNoteContext();

    const handleClick = async () => {
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json });
        }
    };

    return (
        <div className="note-details">
            <h4>{note.title}</h4>
            <h5>{note.contents}</h5>
            <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <button className="material-symbols-outlined">edit</button>
        </div>
    )
}

export default NoteDetails;