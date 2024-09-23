import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { LogOut } from "../../components/CandidateModule/LogOut";
import "./style.css";
import sti from '../stilogo.png'
import Frame174 from "../HRDashboard/Frame 174.png";
import Phone from "../HRDashboard/Phone.png";
import Message from "../HRDashboard/Message.png";
import SettingsButton from "../UploadFile/Settings.png";
import ProfileIcon from "./ProfileIcon.png";
import LockedIcon from "./LockedIcon.png";
import NotifIcon from "./NotifIcon.png";
import Back from "./Back.png";
import Forward from "./Forward.png";

const Settings = () => {
  const navigate = useNavigate();  

  const handleBack = () => {
    navigate("/ApplicantDashboard");
  };

  return (
    <div className="settings">
      <div className="div">
        <img className="image" alt="Image" src="image-1.png" />
        <div className="overlap">
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
                <img className="img" alt="Vector" src={SettingsButton} />
                <LogOut divClassName="log-out-instance" />
              </div>
            </div>
          </div>
          <div className="navbar">
            <Link to="/ApplicantDashboard"><div className="text-wrapper-2 hover-effect">Home</div></Link>
            <div className="text-wrapper-2 hover-effect">Application</div>
            <div className="text-wrapper-2 hover-effect">About</div>
            <div className="text-wrapper-2 hover-effect">Contact</div>
            <Link to="/UploadFile"><div className="text-wrapper-2 hover-effect">Upload File</div></Link>
          </div>
        </div>
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="terms-conditions">Terms &amp; conditions</div>
          <div className="text-wrapper-3">Privacy policy</div>
          <img className="vector-2" alt="Vector" src={Frame174} />
          <div className="text-wrapper-4">Join Us! Contact Here</div>
          <img className="vector-5" alt="Vector" src={Phone} />
          <div className="text-wrapper-5">288718327</div>
          <div className="text-wrapper-6">recruitment@laspinas.sti.edu.ph</div>
          <img className="vector-6" alt="Vector" src={Message} />
        </div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-2" />
        <div className="overlap-group-2">
          <Link to="/MyProfile">
            <div className="rectangle-3" />
            <img className="icon-chevron-right" alt="Icon chevron right" src={Forward} />
            <div className="div-wrapper">
              <div className="frame-3">
                <div className="text-wrapper-7">My Profile</div>
                <p className="p">
                  Here, you can customize your profile information, privacy settings, notifications, and more. Take charge
                  of your online experience and tailor it to your liking.
                </p>
              </div>
            </div>
          </Link>
          <img className="icon-lock-locked" alt="Icon lock locked" src={ProfileIcon} />
        </div>
        <div className="overlap-2">
          <Link to="/Security">
            <div className="rectangle-4" />
            <img className="icon-chevron-right-2" alt="Icon chevron right" src={Forward} />
            <div className="frame-4">
              <div className="frame-3">
                <div className="text-wrapper-7">Security Settings</div>
                <p className="p">
                  Protect your account and data with robust security controls.
                  <br /> Manage password strength, two-factor authentication, privacy settings, and other essential
                  safeguards.
                </p>
              </div>
            </div>
          </Link>
          <img className="frame-5" alt="Frame" src={LockedIcon} />
        </div>
        <div className="overlap-3">
          <img className="icon-lock-locked-2" alt="Icon lock locked" src={NotifIcon}/>
          <div className="frame-6">
            <div className="frame-3">
              <div className="text-wrapper-7">Notifications</div>
              <p className="text-wrapper-8">
                This notification prompts you to update your current password to ensure the security of your
                account. It is important to keep passwords strong and up-to-date to protect against unauthorized access.
              </p>
            </div>
          </div>
          <img className="icon-chevron-right-3" alt="Icon chevron right" src={Forward} />
        </div>
        <div className="frame-7 hover-effect" onClick={handleBack}>
          <img className="vector-7" alt="Vector" src={Back} />
          <div className="text-wrapper-9">Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
