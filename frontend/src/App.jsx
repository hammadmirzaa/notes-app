import { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadNotes() {
    setLoading(true);
    setError('');
    try {
      const data = await getNotes();
      setNotes(data);
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (err) {
      setError(
        'Could not reach the backend. Make sure it is running on http://localhost:3000',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleNewNote() {
    try {
      const note = await createNote('Untitled', '');
      setNotes((prev) => [note, ...prev]);
      setSelectedId(note.id);
    } catch (err) {
      setError('Could not create note.');
    }
  }

  async function handleSave() {
    if (!selectedId) return;
    setSaving(true);
    try {
      const updated = await updateNote(selectedId, title, content);
      setNotes((prev) =>
        prev
          .map((n) => (n.id === selectedId ? updated : n))
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      );
    } catch (err) {
      setError('Could not save note.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      const remaining = notes.filter((n) => n.id !== id);
      setNotes(remaining);
      if (selectedId === id) {
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (err) {
      setError('Could not delete note.');
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Notes V2</h1>
          <button className="new-btn" onClick={handleNewNote}>
            + New
          </button>
        </div>
        {loading ? (
          <p className="hint">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="hint">No notes yet. Create one!</p>
        ) : (
          <ul className="note-list">
            {notes.map((note) => (
              <li
                key={note.id}
                className={note.id === selectedId ? 'active' : ''}
                onClick={() => setSelectedId(note.id)}
              >
                <div className="note-item">
                  <span className="note-item-title">
                    {note.title || 'Untitled'}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    title="Delete note"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="editor">
        {error && <div className="error-banner">{error}</div>}
        {selectedNote ? (
          <>
            <input
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
            <textarea
              className="content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
            />
            <div className="editor-footer">
              <button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </>
        ) : (
          !loading && <p className="hint centered">Select or create a note</p>
        )}
      </main>
    </div>
  );
}
