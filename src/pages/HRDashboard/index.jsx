import React from "react";
import { Candidate } from "../../components/Job/Candidate";
import { Dashboard } from "../../components/CandidateModule/Dashboard";
import { JobPosting } from "../../components/CandidateModule/Dashboard/JobPosting";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { Status } from "../../components/CandidateModule/Status";
import { doSignOut } from "../../firebase/auth";
import "./style.css";
import sti from '../stilogo.png'
import { useNavigate } from "react-router-dom";
import HRFeature from "./HRDashboard-Feature.png";
import { Link } from 'react-router-dom';
import Calendar from "./CalendarBlank.png";
import Clock from "./Clock.png";
import Map from "./MapPinLine.png";
import Frame174 from "./Frame 174.png";
import Phone from "./Phone.png";
import Message from "./Message.png";


const DashboardScreen = () => {
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
    <div className="dashboard-screen">
      <div className="dashboard-2">
        <div className="ellipse" />
        <img className="image" alt="Image" src="image-1.png" />
        <div className="overlap">
          <div className="rectangle" />
          <div className="rectangle-2" />
          <div className="group">
            <Dashboard divClassName="dashboard-instance" property1="default" to="/dashboard" />
          </div>
          <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
          <img class="vector-4" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-2.svg"></img>
          <img class="vector-5" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector.svg"></img>
          <img class="img-5" alt="Vector" src="https://c.animaapp.com/Ip2nhn0S/img/vector-1.svg"></img>
          <Link to="/Candidate" className="candidate-instance hover-effect"> <Candidate /></Link>
          <Link to="/Status" className="status-instance hover-effect"><Status /></Link>
          <Link to="/JobPosting" className="job-posting-instance hover-effect"> <JobPosting /></Link>
        </div>
        <div className="overlap-group">
          <div className="rectangle-3" />
          <div className="frame-3">
            <div className="text-wrapper-5">Privacy policy</div>
            <div className="text-wrapper-5">Terms &amp; conditions</div>
          </div>
          <img className="frame-4" alt="Frame" src={Frame174} />
          <div className="text-wrapper-6">Join Us! Contact Here</div>
          <div className="frame-5">
            <img className="vector-2" alt="Vector" src={Phone} />
            <div className="text-wrapper-7">288718327</div>
          </div>
          <div className="frame-6">
            <img className="vector-3" alt="Vector" src={Message} />
            <div className="text-wrapper-7">recruitment@laspinas.sti.edu.ph</div>
          </div>
        </div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-4" />
        <div className="text-wrapper-8">Features</div>
        <div className="text-wrapper-9">Jobs Posted</div>
        <img className="rectangle-5" alt="Rectangle" src={HRFeature} />
        <div className="frame-7">
          <div className="ellipse-2" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-2" />
          <div className="ellipse-2" />
        </div>
        <div className="frame-8">
          <div className="text-wrapper-10">School Nurse</div>
          <div className="div-wrapper">
            <div className="text-wrapper-11">New post</div>
          </div>
          <div className="frame-9">
            <div className="frame-10">
              <img className="img-2" alt="Map pin line" src={Map} />
              <div className="text-wrapper-12">Las Piñas</div>
            </div>
            <div className="ellipse-4" />
            <div className="frame-10">
              <img className="img-2" alt="Clock" src={Clock} />
              <div className="text-wrapper-12">Full time</div>
            </div>
            <div className="ellipse-4" />
            <div className="frame-10">
              <img className="img-2" alt="Calendar blank" src={Calendar} />
              <div className="text-wrapper-12">29 min ago</div>
            </div>
          </div>
          <p className="a-school-nurse-is-a">
            A school nurse is a registered nurse who plays
            <br /> a vital role in ensuring the health and well-being
            <br /> of students and staff in a school setting. <br />
            Their duties can be summarized into three main <br />
            areas: direct care, health promotion, and <br />
            administrative tasks.
          </p>
          <div className="text-wrapper-13">See more...</div>
        </div>
        <div className="frame-11">
          <div className="text-wrapper-14">Cashier</div>
          <div className="frame-12">
            <div className="text-wrapper-11">New post</div>
          </div>
          <div className="frame-9">
            <div className="frame-10">
              <img className="img-2" alt="Map pin line" src={Map} />
              <div className="text-wrapper-12">Las Piñas</div>
            </div>
            <div className="ellipse-4" />
            <div className="frame-10">
              <img className="img-2" alt="Clock" src={Clock} />
              <div className="text-wrapper-12">Full time</div>
            </div>
            <div className="ellipse-4" />
            <div className="frame-10">
              <img className="img-2" alt="Calendar blank" src={Calendar} />
              <div className="text-wrapper-12">1 day ago</div>
            </div>
          </div>
          <p className="cashiers-are-the">
            Cashiers are the friendly face of a campus, <br />
            responsible for ensuring a smooth checkout <br />
            experience for customers. They handle cash <br />
            register operations, process payments, <br />
            and provide excellent customer service.
          </p>
          <div className="text-wrapper-15">See more...</div>
        </div>
        <div className="frame-13">
          <div className="frame-14">
            <div className="text-wrapper-16">See more jobs...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
