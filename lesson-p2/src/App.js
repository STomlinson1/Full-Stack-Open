import React, { useState, useEffect } from 'react';
import noteService from './services/notes';

import Notification from './components/Notification';
import Note from './components/Note';
import Footer from './components/Footer';

import './index.css';

const App = () => {
	const [ notes, setNotes ] = useState([]);
	const [ newNote, setNewNote ] = useState('a new note...');
	const [ showAll, setShowAll ] = useState(true);
	const [ errorMessage, setErrorMessage ] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content   : newNote,
			date      : new Date().toISOString(),
			important : Math.random() < 0.5
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes([ ...notes, returnedNote ]);
			setNewNote('Enter a new note');
		});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(`Note '${note.content}' was laready removed from server`);

				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);

				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
			<Footer />
		</div>
	);
};

export default App;