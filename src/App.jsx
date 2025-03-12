import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import NoteItem from "./components/NoteItem";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let note = Object.fromEntries(formData);

    setNotes([...notes, { id: uuidv4(), tags: [], ...note }]);
  };

  const handleCreateTag = (noteId, tag) => {
    setNotes(
      notes.map((item) => {
        if (item.id === noteId) {
          item.tags.push(tag);
        }

        return item;
      })
    );
  };

  const handleRemoveNote = (noteId) => {
    setNotes(notes.filter((item) => item.id !== noteId));
  };

  const handleRemoveAllNotes = () => {
    setNotes([]);
  };

  const handleEditNote = (noteId, noteLabel) => {
    setNotes(
      notes.map((item) => {
        if (item.id === noteId) {
          item.label = noteLabel;
        }

        return item;
      })
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRemoveTag = (tagId) => {
    setNotes(notes.map(note => {
      note.tags = note.tags.filter(item => item.id !== tagId)
      return note
    }))
  }

  useEffect(() => {
    setFilteredNotes(
      notes.filter((item) => item.tags.find((tag) => tag.name.includes(search)))
    );
  }, [search]);

  const data =
    filteredNotes.length > 0 || search.length > 0 ? filteredNotes : notes;

  return (
    <div className="todo">
      <div className="todo-aside">
        <div className="todo-aside__header">
          <div className="form-item">
            <label htmlFor="search">Search:</label>
            <div className="search">
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                value={search}
                onChange={handleSearch}
                placeholder="Search by tag..."
              />
              <MdClose
                className="search-icon"
                onClick={() => {
                  setSearch("");
                  setFilteredNotes([]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="todo-aside__content">
          <form className="form" onSubmit={handleCreateNote}>
            <div className="form-item">
              <label htmlFor="label">Add Note:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add tags using # symbol"
                name="label"
                id="label"
              />
            </div>

            <button className="btn" type="submit">
              ADD
            </button>
          </form>
        </div>
        <div className="todo-aside__footer">
          <button className="btn" onClick={handleRemoveAllNotes}>
            Delete all notes
          </button>
        </div>
      </div>
      <div className="todo-content">
        <h2>Notes List</h2>
        <div className="note-list">
          {data &&
            data.map((item, index) => (
              <NoteItem
                key={item.id}
                index={index + 1}
                note={item}
                removeNote={() => handleRemoveNote(item.id)}
                createTag={handleCreateTag}
                editNote={handleEditNote}
                removeTag= {handleRemoveTag}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
