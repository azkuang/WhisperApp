import { useState } from 'react';

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [contents, setContent] = useState('');
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = {title, contents};

        // Send post request to backend
        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        // Check for response
        if (!response) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            console.log("New note added.");
        }

        // Reset states
        setTitle('');
        setContent('');
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new note</h3>
            <label>Note Title</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
            />

            <label>Note Content</label>
            <input 
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={contents} 
            />
            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default NoteForm;