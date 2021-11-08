import React, { useEffect, useState } from "react";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import classes from "./Table.module.css";
import { toast } from "react-toastify";

const Table = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const deleteHandler = (id) =>{
      if(window.confirm("Are you sure you wanted to delete?")){
          fireDb.child(`contacts/${id}`).remove((err) => {
              if(err){
                  toast.error(err);
              } else {
                  toast.success("Delete Successfully!");
              }
          });
      }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <table className={classes.style}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <div className={classes.btn}>
                  <Link to={`/update/${id}`}>
                    <button className={classes.edit}>Update</button>
                  </Link>
                  <button 
                  className={classes.delete} 
                  onClick={() => {deleteHandler(id)}}>
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className={classes.view}>View</button>
                  </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
