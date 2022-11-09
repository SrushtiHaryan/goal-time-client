import { MdDeleteForever } from 'react-icons/md';
import AddNote from '../AddNote/AddNote';
import {useState} from 'react';
const Note = ({id, text, date, handleDeleteNote}) => {


    // const handleChange = (event) =>{
        
    //     setNoteText(event.target.value);
    // };

    // const handleSaveClick = () => {
	// 	if (noteText.trim().length > 0) {
	// 		handleAddNote(noteText);
	// 		setNoteText('');
	// 	}
	// };

    return <div className='note'>
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
               {/* < button className='save' onChange={handleChange}>
					Edit
				</button> */}
                <MdDeleteForever onClick= {() =>handleDeleteNote(id)} className="delete-icon" size="1.3em"/>
            </div>
        </div>;
    
};

export default Note;