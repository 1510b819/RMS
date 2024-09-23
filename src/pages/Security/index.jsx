import React, { useState, useEffect } from "react";
import "./style.css";
import { LogOut } from "../../components/CandidateModule/LogOut";
import Frame174 from "../HRDashboard/Frame 174.png";
import Phone from "../HRDashboard/Phone.png";
import Message from "../HRDashboard/Message.png";
import SettingsButton from "../UploadFile/Settings.png";
import LockedIcon from "../Settings/LockedIcon.png";
import sti from "../stilogo.png";
import Back from "../Settings/Back.png";
import { Link } from 'react-router-dom';
import Forward from "../Settings/Forward.png";
import { ChangePassword } from "../../components/ChangePassword/ChangePassword";

const Security = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleOverlayToggle = () => {
    setOverlayVisible(prev => !prev);
  };

  // Close overlay if clicked outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleOverlayToggle();
    }
  };

  // Handle body scrolling
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOverlayVisible);
  }, [isOverlayVisible]);

  return (
    <div className="security">
      <div className="div">
        <img className="image" alt="Image" src="image-1.png" />
        <div className="overlap-group">
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
                <Link to="/Settings">
                  <img
                    className="vector"
                    alt="Vector"
                    src={SettingsButton}
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
                <LogOut divClassName="log-out-instance hover-effect" />
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
        <div className="overlap">
          <div className="rectangle" />
          <div className="terms-conditions">Terms &amp; conditions</div>
          <div className="text-wrapper-3">Privacy policy</div>
          <img className="vector-2" alt="Vector" src={Frame174} />
          <img className="vector-3" alt="Vector" src="vector-3.svg" />
          <img className="vector-4" alt="Vector" src="vector-4.svg" />
          <div className="text-wrapper-4">Join Us! Contact Here</div>
          <img className="vector-5" alt="Vector" src={Phone} />
          <div className="text-wrapper-5">288718327</div>
          <div className="text-wrapper-6">recruitment@laspinas.sti.edu.ph</div>
          <img className="vector-6" alt="Vector" src={Message} />
        </div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-2" />
        <div className="overlap-2" onClick={handleOverlayToggle} style={{ cursor: 'pointer' }}>
          <div className="rectangle-3" />
          <img className="icon-chevron-right" alt="Icon chevron right" src={Forward} />
          <div className="div-wrapper">
            <div className="frame-3">
              <div className="text-wrapper-7">Change Password</div>
              <p className="p">Update your current password to ensure your account remains secure.</p>
            </div>
          </div>
          <img className="frame-4" alt="Frame" src={LockedIcon} />
        </div>
        <Link to="/Settings">
        <div className="frame-5">
          <img className="vector-7" alt="Vector" src={Back} />
          <div className="text-wrapper-8">Security Settings</div>
        </div>
        </Link>

        {/* Conditional rendering of the overlay */}
        {isOverlayVisible && (
          <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks on the overlay from closing it */}
              <ChangePassword />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Security;
