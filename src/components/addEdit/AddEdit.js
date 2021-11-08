import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import classes from "./AddEdit.module.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";

const AddEdit = () => {
  const initializeState = {
    name: "",
    email: "",
    contact: "",
  };
  const [state, setState] = useState(initializeState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initializeState });
    }
    return () => {
      setState({ ...initializeState });
    };
  }, [id, data]);

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...setState, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child(`contacts`).push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
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
            onChange={handlerInputChange}
            // ref={nameInputRef}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={handlerInputChange}
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
            onChange={handlerInputChange}
            // ref={phoneInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.button}>
            Add
          </button>

          {/* {<button type="submit" className={classes.button}>
            Update
          </button>} */}
        </div>
      </form>
    </section>
  );
};
export default AddEdit;
