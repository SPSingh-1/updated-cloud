import React,{useContext,useEffect, useRef, useState} from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const{notes, getNotes, editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      history("/login")
    }
      
       // eslint-disable-next-line
  }, [])
  
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, uptitle: currentNote.title, updescription: currentNote.description, uptag: currentNote.tag})
    props.showAlert("updated successfully", "Success")
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  //set the fome in update fome or when you click on edit button
  const [note, setNote] = useState({id:"", uptitle: "", updescription:"",uptag: "" });

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
 }
  const handleUpdate = (e)=>{
    // console.log("Updating.note...",note)
    editNote(note.id, note.uptitle, note.updescription, note.uptag)
    refClose.current.click();
    props.showAlert("Updated successfully", "success")
  }
  return (
    <>
    <AddNotes showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="my-3">
          <div className="mb-3">
            <label htmlFor="uptitle" className="form-label" >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="uptitle"
              name="uptitle"
              value={note.uptitle}
              onChange={onChange}
              minLength={5} required          
            />
            <span id="uptitle-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="updescription" className="form-label" >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="updescription"
              name="updescription"
              value={note.updescription}
              onChange={onChange}
              minLength={5} required
            />
            <span id="updescription-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="uptag" className="form-label" >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="uptag"
              name="uptag"
              value={note.uptag}
              onChange={onChange}

            />
            <span id="uptag-error"></span>
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.uptitle.length<5 || note.updescription.length<5} onClick={handleUpdate} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
            {notes.length === 0 && 'No notes to display'}
          </div>
          {/* Check if notes is an array before mapping */}
          {notes.length > 0 && notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} notes={note} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
