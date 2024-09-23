import React from "react";
import { Dashboard } from "../../components/CandidateModule/Dashboard";
import { JobPosting } from "../../components/CandidateModule/Dashboard/JobPosting";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { Status } from "../../components/CandidateModule/Status";
import { Link } from 'react-router-dom';
import "./CandidateStyle.css";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import sti from '../stilogo.png'

const Candidate = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    doSignOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  return (
    <div className="candidates">
      <div className="div-2">
        {/* <img className="image" alt="Image" src="https://c.animaapp.com/Ip2nhn0S/img/image-1@2x.png" /> */}
        <img className="image" alt="Image" src={sti} />
        <div className="overlap">
          <div className="rectangle" />
          <img className="vector" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector.svg" />
          <img className="img" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-1.svg" />
          <img className="vector-2" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-2.svg" />
          <div className="rectangle-2" />
          <div className="text-wrapper-4">Candidate</div>
          <Link to="/HRDashboard" className="dashboard-instance hover-effect"><Dashboard /></Link>
          <Link to="/Status" className="status-instance hover-effect"><Status /></Link>
          <Link to="/JobPosting" className="job-posting-instance hover-effect"> <JobPosting /></Link>
          <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
        </div>
        <div className="rectangle-3" />
        <div className="text-wrapper-5">10</div>
        <div className="text-wrapper-6">04</div>
        <div className="text-wrapper-7">04</div>
        <div className="text-wrapper-8">APPLIED</div>
        <div className="text-wrapper-9">OFFERED</div>
        <div className="text-wrapper-10">ASSIGNED</div>
        <div className="frame">
          <div className="overlap-group">
            <img className="group" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="text-wrapper-11">Ronald Gorgonia</div>
            <div className="text-wrapper-12">IT Instructor</div>
            <div className="div-wrapper">
              <div className="text-wrapper-13">Applied</div>
            </div>
            <img
              className="lets-icons-clock"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic.svg"
            />
            <div className="progress">
              <div className="overlap-group-2">
                <img className="ellipse" alt="Ellipse" src="https://c.animaapp.com/Ip2nhn0S/img/ellipse-3.svg" />
                <div className="text-wrapper-14">50%</div>
              </div>
            </div>
          </div>
          <div className="overlap-2">
            <img className="group" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-3">
              <div className="text-wrapper-15">Assigned</div>
              <div className="rectangle-4" />
              <div className="text-wrapper-15">Assigned</div>
            </div>
            <div className="text-wrapper-16">Franco Maturan</div>
            <div className="overlap-4">
              <div className="text-wrapper-17">IT Instructor</div>
              <div className="text-wrapper-17">IT Instructor</div>
            </div>
            <div className="lets-icons-clock-wrapper">
              <img
                className="lets-icons-clock-2"
                alt="Lets icons clock"
                src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
              />
            </div>
            <div className="solid-sheet-wrapper">
              <img
                className="fa-solid-sheet"
                alt="Solid sheet"
                src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-2.svg"
              />
            </div>
          </div>
          <div className="overlap-5">
            <img className="group-2" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-18">Applied</div>
            </div>
            <div className="text-wrapper-19">Angel Valenzuela</div>
            <div className="text-wrapper-20">Admin</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-3.svg"
            />
          </div>
          <div className="overlap-7">
            <img className="group-2" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-15">Assigned</div>
            </div>
            <div className="text-wrapper-21">Josh Larracas</div>
            <div className="text-wrapper-22">IT Instructor</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-10.svg"
            />
          </div>
          <div className="overlap-8">
            <img className="group-2" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-15">Assigned</div>
            </div>
            <div className="text-wrapper-23">Joshua Ignacio</div>
            <div className="text-wrapper-22">Accounting</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-4.svg"
            />
          </div>
          <div className="overlap-9">
            <img className="group-2" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-15">Assigned</div>
            </div>
            <div className="text-wrapper-24">Bryan Frilles</div>
            <div className="text-wrapper-25">Admin</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-9.svg"
            />
          </div>
          <div className="overlap-10">
            <img className="group-3" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-26">Applied</div>
            </div>
            <div className="text-wrapper-24">Irish Morales</div>
            <div className="text-wrapper-27">Science Instructor</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-8.svg"
            />
          </div>
          <div className="overlap-11">
            <img className="group-3" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-26">Applied</div>
            </div>
            <div className="text-wrapper-28">Kerby Maynes</div>
            <div className="text-wrapper-22">IT Instructor</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-7.svg"
            />
          </div>
          <div className="overlap-12">
            <img className="group-3" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-26">Applied</div>
            </div>
            <div className="text-wrapper-28">Orly Cancillar</div>
            <div className="text-wrapper-25">Admin</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-6.svg"
            />
          </div>
          <div className="overlap-13">
            <img className="group-3" alt="Group" src="https://c.animaapp.com/Ip2nhn0S/img/group-9@2x.png" />
            <div className="overlap-6">
              <div className="text-wrapper-26">Applied</div>
            </div>
            <div className="text-wrapper-29">Shaeil Baysan</div>
            <div className="text-wrapper-22">IT Instructor</div>
            <img
              className="lets-icons-clock-3"
              alt="Lets icons clock"
              src="https://c.animaapp.com/Ip2nhn0S/img/lets-icons-clock-fill-10.svg"
            />
            <img
              className="solid-sheet-2"
              alt="Solid sheet"
              src="https://c.animaapp.com/Ip2nhn0S/img/fa6-solid-sheet-plastic-5.svg"
            />
          </div>
        </div>
        <div className="rectangle-5" />
        <div className="rectangle-6" />
        <div className="rectangle-7" />
        <div className="pagination">
          <img className="button" alt="Button" src="https://c.animaapp.com/Ip2nhn0S/img/button.svg" />
          <button className="button-2">
            <div className="text-wrapper-30">1</div>
          </button>
          <button className="button-3">
            <div className="text-wrapper-31">2</div>
          </button>
          <button className="button-3">
            <div className="text-wrapper-31">3</div>
          </button>
          <button className="button-3">
            <div className="text-wrapper-31">4</div>
          </button>
          <button className="button-3">
            <div className="text-wrapper-31">5</div>
          </button>
          <img className="button" alt="Button" src="https://c.animaapp.com/Ip2nhn0S/img/button-1.svg" />
        </div>
      </div>
    </div>
  );
};


export default Candidate;