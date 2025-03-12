import React, { memo, useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const NoteItem = ({ index, note, removeNote, editNote, createTag, removeTag }) => {
  const [noteLabel, setNoteLabel] = useState(note.label);
  const [isEdit, setIsEdit] = useState(false);
  const [isTagShow, setIsTagShow] = useState(true);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  const handleSaveEdit = () => {
    editNote(note.id, noteLabel);

    setIsEdit(false);
  };

  const handleCreateTag = (noteId) => {
    if (tagName.startsWith("#")) {
      createTag(noteId, { id: uuidv4(), name: tagName });
      setTagName("");
      setIsTagShow(!isTagShow);
    } else {
      setError("Tag length can't be equal 0. Should include '#'");

      setTimeout(() => setError(""), 2000);
    }
  };

  //   useEffect(() => {
  //     console.log("NoteItem component");
  //   });

  return (
    <div className="item">
      <div className="item__header">
        {!isEdit ? (
          <p className="item__text">
            <b>{index}.</b> {note.label}
          </p>
        ) : (
          <textarea
            type="text"
            className="item__textarea"
            onChange={(e) => setNoteLabel(e.target.value)}
            value={noteLabel}
          >
            {noteLabel}
          </textarea>
        )}

        <div className="item__action">
          {!isEdit ? (
            <>
              <button className="btn" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
              <button className="btn" onClick={removeNote}>
                X
              </button>
            </>
          ) : (
            <>
              <button className="btn" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="btn" onClick={() => setIsEdit(!isEdit)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="item__footer">
        {isTagShow ? (
          <ul className="tag">
            {note.tags &&
              note.tags.map((item) => (
                <li
                  key={item.id}
                  className="tag__item"
                  onDoubleClick={() => removeTag(item.id)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        ) : (
          <input
            type="text"
            className="tag-input"
            placeholder="Use # symbol to add new tag"
            onChange={(e) => setTagName(e.target.value)}
          />
        )}

        <div className="item__action">
          {isTagShow ? (
            <button className="btn" onClick={() => setIsTagShow(!isTagShow)}>
              ADD
            </button>
          ) : (
            <>
              <button className="btn" onClick={() => handleCreateTag(note.id)}>
                Save
              </button>
              <button className="btn" onClick={() => setIsTagShow(!isTagShow)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(NoteItem, (prevProps, currentProps) => {
  // console.log(`<------------ -------------->`)
  // console.log(JSON.stringify(prevProps))
  // console.log(JSON.stringify(currentProps))
  // console.log(`<------------ -------------->`)
  // return JSON.stringify(prevProps.note) === JSON.stringify(currentProps.note)
});
