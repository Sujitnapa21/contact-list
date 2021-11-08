import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { Link, useParams } from "react-router-dom";
import classes from "./View.module.css";

const View = (props) => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  console.log("user", user);

  return (
    <div >
      <div style={{ marginTop: "150px" }}>
        <div className={classes.card}>
          <div className={classes.header}>
            <p>User Contact Detail</p>
          </div>
          <div className={classes.container}>
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{user.name}</span>
            <br />
            <strong>Email: </strong>
            <span>{user.email}</span>
            <br />
            <strong>Contact: </strong>
            <span>{user.contact}</span>
            <br />
            <br />
            <div className={classes.actions}>
              <Link to="/">
                <button className={classes.button} >Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
