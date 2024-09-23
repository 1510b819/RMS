import React from "react";
import { Candidate } from "../../components/Job/Candidate";
import { Dashboard } from "../../components/Job/Dashboard";
import { Find } from "../../components/Find";
import { JobPosting } from "../../components/CandidateModule/Dashboard/JobPosting";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { Status } from "../../components/Status";
import "./style.css";
import { doSignOut } from "../../firebase/auth";
import { Link } from 'react-router-dom';
import  greenCircle  from "./greenCircle.png";
import grayCircle from "./greenCircle.png";
import { useNavigate } from "react-router-dom";
import sti from '../stilogo.png'

const StatusScreen = () => {
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
        <div className="status-screen">
          <div className="status-2">
            <div className="ellipse" />
            <img className="image" alt="Image" src="image-1.png" />
            <div className="overlap">
              <div className="rectangle" />
            
              <div className="rectangle-2" />
              <div className="group">
              <Link to="/HRDashboard" className="dashboard-instance hover-effect"><Dashboard /></Link>
              </div>
              <img className="img" alt="Vector-2" src="https://c.animaapp.com/Ip2nhn0S/img/vector.svg" />
              <img class="img-2" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-1.svg"></img>
              <img className="vector" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-2.svg" />
              <Link to="/Candidate" className="candidate-instance hover-effect"> <Candidate /></Link>
              <Status className="status-instance" divClassName="status-3" />
              <Link to="/JobPosting" className="job-posting-instance hover-effect"> <JobPosting /></Link>
              <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
            </div>
            <div className="overlap-group">
              <div className="rectangle-3" />
            </div>
            <img className="logo" alt="Logo" src={sti} />
            <div className="overlap-2">
              <div className="div-wrapper">
                <div className="frame-3">
                  <div className="text-wrapper-10">Ronald Gorgonia</div>
                </div>
              </div>
              <div className="progress">
                <div className="overlap-3">
                  <img className="ellipse-2" alt="Ellipse" src={grayCircle} />
                  <img className="ellipse-2" alt="Ellipse" src={greenCircle} />
                  <div className="text-wrapper-11">100%</div>
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img className="ellipse-2" alt="Ellipse" src={greenCircle} />
                      <div className="text-wrapper-11">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-wrapper-12">Applicant Status</div>
            <div className="rectangle-4" />
            <div className="frame-4">
              <div className="group-2" />
              <div className="magnifying-glass-wrapper">
                <div className="magnifying-glass">
                  <div className="overlap-group-3">
                    <img className="vector-stroke" alt="Vector stroke" src="https://c.animaapp.com/b7Lhz5U5/img/vector--stroke-.svg" />
                    <img className="vector-stroke-2" alt="Vector stroke" src="https://c.animaapp.com/b7Lhz5U5/img/vector--stroke--1.svg" />
                  </div>
                  <div className="text-wrapper-13">Search applicant</div>
                </div>
              </div>
              <div className="text-wrapper-14">Type of Job</div>
              <div className="group-3">
                <img className="caret-down" alt="Caret down" src="https://c.animaapp.com/b7Lhz5U5/img/caretdown-3.svg" />
                <div className="frame-5">
                  <div className="text-wrapper-15">Full-time</div>
                </div>
              </div>
              <div className="text-wrapper-14">Position</div>
              <div className="group-3">
                <img className="caret-down" alt="Caret down" src="https://c.animaapp.com/b7Lhz5U5/img/caretdown-3.svg" />
                <div className="frame-5">
                  <div className="text-wrapper-15">Instructor</div>
                </div>
              </div>
              <Find />
            </div>
            <div className="frame-6">
              <div className="text-wrapper-16">Franco Maturan</div>
              <div className="progress">
                <div className="overlap-group-4">
                  <img className="ellipse-2" alt="Ellipse" src={greenCircle} />
                  <div className="text-wrapper-11">100%</div>
                </div>
              </div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-4">
                <div className="frame-7">
                  <div className="text-wrapper-17">Angel Valenzuela</div>
                </div>
                <div className="progress">
                  <div className="overlap-group-5">
                    <img className="ellipse-2" alt="Ellipse" src={greenCircle} />
                    <div className="text-wrapper-11">100%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-8">
              <div className="text-wrapper-18">Josh Larracas</div>
              <div className="progress">
                <div className="overlap-group-6">
                  <img className="ellipse-2" alt="Ellipse" src={greenCircle} />
                  <div className="text-wrapper-11">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };    

export default StatusScreen;
