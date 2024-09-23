import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        This project was generated By{" "}
        <a href="https://www.dhiwise.com" style={{ color: "#87CEFA", textDecoration: "none" }}>
          Dhiwise
        </a>
        . Quickly use below links to navigate through all pages.
      </p>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/main" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Main
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/login" style={{ color: "#87CEFA", textDecoration: "none" }}>
            LogIn
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/signup" style={{ color: "#87CEFA", textDecoration: "none" }}>
            SignUp
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/candidate" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Candidate
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/jobposting" style={{ color: "#87CEFA", textDecoration: "none" }}>
            JobPosting
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
