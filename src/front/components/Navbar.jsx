import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      {!token ? (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </>
      ) : (
        <>
          <Link to="/private" style={styles.link}>Private</Link>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    gap: "15px",
    padding: "10px",
    backgroundColor: "#282c34",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "18px",
  }
};

export default Navbar;
