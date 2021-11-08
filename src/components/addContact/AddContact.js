import classes from './AddContact.module.css';


const AddContact = () => {

  

    return (
    <section className={classes.contact}>
      <form >
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            placeholder="Enter Contact Number"
            id="contact"
   
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.button} >
            Add
          </button>
        </div>
      </form>
    </section>
    
  );
}

export default AddContact;