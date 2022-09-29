import React,{useRef} from 'react'
import './Input.css'
const InputForm = (props) => {
   const titleRef = useRef('');
   const openTextRef = useRef('');
   const dateRef = useRef('');

    function saveInput(e){
        e.preventDefault();

        const newMovie = {
            title : titleRef.current.value,
            openingText : openTextRef.current.value,
            releaseDate : dateRef.current.value
        }
        props.onAddMovie(newMovie);
    }
   return (
    <div className="input-form" >
    <form onSubmit={saveInput}>
        <label htmlFor='title'>Title</label> 
        <br></br>
        <input type="text" id='title' ref={titleRef}></input>
        <br/>
        <label htmlFor='opening-text'>Opening Text</label> 
        <br></br>
        <textarea type="text" style={{rows:'5',width:'70vw',height:'70px',border:'1px solid #ccc',borderRadius:'5px'}}  id='opening-text' ref={openTextRef}></textarea>
        <br/>
        <label htmlFor='date'>Release Date</label> 
        <br></br>
        <input type="date" id='date' ref={dateRef}></input>

    <button style={{marginTop:'1.5rem', marginLeft:'12.2rem'}}>Add Movie to list</button>

    </form>

    </div>
  )
}

export default InputForm