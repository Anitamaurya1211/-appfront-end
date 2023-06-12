import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import{toast} from "react-toastify";
import axios from "axios";
const Home = ()=>{
    const [data, setData] =useState([]);

    const loadData= async () =>{
        const response = await axios.get("http://localhost:3000/mywork");
        console.log(response.data);
        setData(response.data);
    } 
    useEffect(() =>{
        loadData();
    },[]);

    const deleteContact =(id) => {
        if(window.confirm("Are you sure that you wanted to delete that Task?")){
            axios.delete(`http://localhost:3000/mywork/${id}`);
            toast.success("Task Deleted Successfully");
            setTimeout(()=> loadData (), 500);
        }
    }
    return(
        <div style={{marginTop: "170px"}}>
            <Link to="/addContact">
            <button className="btn btn-contact">Add Task</button>
            </Link>
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>No.</th>
                    <th style={{textAlign: "center"}}>Title</th>
                    <th style={{textAlign: "center"}}>Task</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.title}</td>
                            <td>{item.task}</td>
                            <td>{item.action}</td>
                
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={()=> deleteContact(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-view">View</button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
};
export default Home;


