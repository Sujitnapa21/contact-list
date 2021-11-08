import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import classes from "./AddEdit.module.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";

const AddEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setName(snapshot.val()[id]?.name);
        setEmail(snapshot.val()[id]?.email);
        setContact(snapshot.val()[id]?.contact);
      } else {
      }
    });
  }, [id]);

  const handlerName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handlerEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlerContact = (event) => {
    console.log(event.target.value);
    setContact(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newData = { name, email, contact };

    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child(`contacts`).push(newData, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(newData, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Updated Successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
 
  };

  return (
    <section className={classes.contact}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            value={name}
            onChange={handlerName}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={handlerEmail}
            // ref={emailInputRef}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            placeholder="Enter Contact Number"
            id="contact"
            value={contact}
            onChange={handlerContact}
            // ref={phoneInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.button}>
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
    // <h2>hello</h2>
  );
};
export default AddEdit;
