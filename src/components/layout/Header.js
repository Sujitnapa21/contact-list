import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";


const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() =>{
      if(location.pathname === "/") {
        setActiveTab("Home");
      } else if(location.pathname === "/add") {
        setActiveTab("AddContact");
      } else if(location.pathname === "/about") {
        setActiveTab("About");
      }
  })

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Contact App</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <p
                className={`${activeTab === "Home" ? "active" : ""} `}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </p>
            </Link>
          </li>
          <li>
          <Link to="/add">
              <p
                className={`${activeTab === "AddContact" ? "active" : ""} `}
                onClick={() => setActiveTab("AddContact")}
              >
                Add Contact
              </p>
            </Link>
          </li>
          <li>
          <Link to="/about">
              <p
                className={`${activeTab === "About" ? "active" : ""} `}
                onClick={() => setActiveTab("About")}
              >
                About
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
