import React,{useState} from 'react'
import './Input.css'
const InputForm = (props) => {
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState();

    const changeInput =(e)=> {
        var input = e.target.value;    
        setTitle(input);
    }
    const changeDes =(e)=> {
        var desc = e.target.value;
        setDescription(desc);
    }

    const getInputDataHandler = (e) => {
        // setTitle(title);
        console.log(title,description);
        console.log(  document.getElementById('date').value)
        setTitle('' );
        setDescription('')
        
    }
  return (
    <div className="input-form" >
        <label>Title</label> 
        <br></br>
        <input type="text" value={title} onChange={changeInput}></input>
        <br/>
        <label>Opening Text</label> 
        <br></br>
        <input type="text" style={{height:'50px'}} value ={description} onChange={changeDes} ></input>
        <br/>
        <label>Release Date</label> 
        <br></br>
        <input type="date" id='date'></input>

    <button style={{marginTop:'1.5rem', marginLeft:'12.2rem'}} onClick={getInputDataHandler}>Add Movie to list</button>
    </div>
  )
}

export default InputForm