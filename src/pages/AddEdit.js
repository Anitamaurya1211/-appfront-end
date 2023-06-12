import  React, { useState, useEffect} from "react";
import{useNavigate, useParams, Link}from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import{ toast } from "react-toastify";

const initialState ={
    title:"",
    task:"",
}

const AddEdit = () => {
    const [state, setState]= useState(initialState);

    const{title, task}= state;

    const navigate = useNavigate();

    const {id} =useParams();

    useEffect(() =>{
        axios.get(`http://localhost:3000/mywork/${id}`)
        .then((resp) => setState({...resp.data[0]}))
         },[id]);
 
    const handleSubmit=(e) =>{
        e.preventDefault();
        if(!title || ! task){
            toast.error("Please provide value into each input field");
        } else{
            if(!id){
                axios
                .post("http://localhost:3000/mywork",{
                title,
                task,
            })
            .then(()=>{
                setState({title: "", task:""})
            })
            .catch((err)=> toast.error(err.response.data))
             toast.success("Contact Added Successfully")
        }else{
            axios
            .put(`http://localhost:3000/mywork`,{
                title,
                task,
                id,
            })
            .then(()=>{
                setState({title: "", task:""})
            })
            .catch((err)=> toast.error(err.response.data))
             toast.success(" Task Updated Successfully")

        }
            setTimeout(()=>navigate("/"),500);
     }
    }

    const handleInputChange= (e) => {
        const {name, value} =e.target;
        setState({...state, [name]: value});
    };


    return (
        <div style={{marginTop:"100px"}}>
            <form style={{
                margin:"auto",
                padding: "15px",
                maxWidth:"400px",
                alignContent:"crnter"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                placeholder="Your Title...?"
                value={title ||""}
    
                onChange={handleInputChange}
                />
                <label htmlFor="task">Task</label>
                <input
                type="text"
                id="task"
                name="task"
                placeholder="Your Task...?"
                value={task || ""}
            
                onChange={handleInputChange}
                />
            
                 <input type="submit" value={id ? "Update" : "Save"}/>
                 <Link to="/">
                    <input type="button" value="Go Back"/>
                 </Link>
            </form>

        </div>
    )

}

export default AddEdit;