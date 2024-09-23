import React, {useState} from "react";
import { Group } from "../../components/Group";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { Link } from 'react-router-dom';
import "./style.css";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import usePositionToggle from './usePositionToggle';
import sti from '../stilogo.png'

const GuestDashboard = () => {
  const navigate = useNavigate(); 
  const { positions, handleTogglePosition } = usePositionToggle();
  const [selected, setSelected] = useState(null);

  const handleOverlapClick = () => {
    setSelected(null);
  };

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };
  const handleLogout = () => {
    doSignOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  
  return (
    <div className="applicant-dashboard">
      <div className="div-4">
        <div className="overlap-6">
         {/* <img className="image" alt="Image" src="https://c.animaapp.com/u3FUp8l1/img/image-4@2x.png" /> */}
         <img className="image" alt="Image" src={sti} />
          <div className="group-2">
            <p className="p">
              A school nurse is a registered nurse who plays a vital role in ensuring the health and well-being of
              students and staff in a school setting. Their duties can be summarized into three main areas: direct care,
              health promotion, and administrative tasks.
            </p>
            <div className="frame">
              <div className="frame-2">
                <div className="frame-3">
                  <div className="text-wrapper-8">STI Las Piñas Campus</div>
                </div>
                <div className="frame-4">
                  <div className="text-wrapper-9">School Nurse</div>
                  <div className="frame-5">
                    <div className="text-wrapper-10">New post</div>
                  </div>
                </div>
              </div>
              <div className="frame-6">
                <div className="frame-7">
                  <img className="img" alt="Map pin line" src="https://c.animaapp.com/u3FUp8l1/img/mappinline-1.svg" />
                  <div className="text-wrapper-11">Las Piñas</div>
                </div>
                <div className="ellipse" />
                <div className="frame-7">
                  <img className="img" alt="Clock" src="https://c.animaapp.com/u3FUp8l1/img/clock-1.svg" />
                  <div className="text-wrapper-11">Full time</div>
                </div>
                <div className="ellipse" />
                <div className="frame-7">
                  <img
                    className="img"
                    alt="Calendar blank"
                    src="https://c.animaapp.com/u3FUp8l1/img/calendarblank-1.svg"
                  />
                  <div className="text-wrapper-11">29 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-7">
          {/*<img className="image" alt="Image" src="https://c.animaapp.com/u3FUp8l1/img/image-4@2x.png" />*/}
          <img className="image" alt="Image" src={sti} />
          <div className="group-2">
            <p className="p">
              Cashiers are the friendly face of a retail store, responsible for ensuring a smooth checkout experience
              for customers. They handle cash register operations, process payments, and provide excellent customer
              service.
            </p>
            <div className="frame">
              <div className="frame-2">
                <div className="frame-3">
                  <div className="text-wrapper-8">STI Las Piñas Campus</div>
                </div>
                <div className="frame-4">
                  <div className="text-wrapper-9">Cashier</div>
                </div>
              </div>
              <div className="frame-6">
                <div className="frame-7">
                  <img className="img" alt="Map pin line" src="https://c.animaapp.com/u3FUp8l1/img/mappinline-1.svg" />
                  <div className="text-wrapper-11">Las Piñas</div>
                </div>
                <div className="ellipse" />
                <div className="frame-7">
                  <img className="img" alt="Clock" src="https://c.animaapp.com/u3FUp8l1/img/clock-1.svg" />
                  <div className="text-wrapper-11">Full time</div>
                </div>
                <div className="ellipse" />
                <div className="frame-7">
                  <img
                    className="img"
                    alt="Calendar blank"
                    src="https://c.animaapp.com/u3FUp8l1/img/calendarblank-1.svg"
                  />
                  <div className="text-wrapper-11">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<img className="image-2" alt="Image" src="https://c.animaapp.com/u3FUp8l1/img/image-1@2x.png" />*/}
        <img className="image-2" alt="Image" src={sti} />
        <div className="navbar">
          <div className="rectangle-3" />
          <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector.svg" />
          <img className="vector-2" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-1.svg" />
          <img className="vector-3" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
          <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
          <div className="text-wrapper-12 hover-effect">Application</div>
          <div className="text-wrapper-13 hover-effect">About</div>
          <div className="text-wrapper-14 hover-effect">Contact</div>
          <div className="rectangle-4" />
          <div className="text-wrapper-15">Home</div>
        </div>
        <div className="rectangle-5" />
        <div className="overlap-8">
          <div className="frame-8">
            <div className="text-wrapper-16">Date Posted</div>
            <div className="frame-9">
              <div className="ellipse-2" />
              <div className="text-wrapper-17">Last 24 hours</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Last 3 days</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Last 7 days</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Last 14 days</div>
              <div className="ellipse-4" />
              <div className="text-wrapper-19">Anytime</div>
            </div>
          </div>
          <div className="frame-10">
            <div className="text-wrapper-16">Job Type</div>
            <div className="frame-11">
              <div className="ellipse-2" />
              <div className="text-wrapper-17">Full - time</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Contract</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Internship</div>
              <div className="ellipse-3" />
              <div className="text-wrapper-18">Part time</div>
              <div className="ellipse-4" />
              <div className="text-wrapper-19">Temporary</div>
            </div>
          </div>
          <div>
          <label className="ellipse-5">
        <input type="radio" value="ellipse-5" checked={selected === "ellipse-5"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-6">
        <input type="radio" value="ellipse-6" checked={selected === "ellipse-6"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-7">
        <input type="radio" value="ellipse-7" checked={selected === "ellipse-7"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-8">
        <input type="radio" value="ellipse-8" checked={selected === "ellipse-8"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-9">
        <input type="radio" value="ellipse-9" checked={selected === "ellipse-9"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-10">
        <input type="radio" value="ellipse-10" checked={selected === "ellipse-10"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-11">
        <input type="radio" value="ellipse-11" checked={selected === "ellipse-11"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-12">
        <input type="radio" value="ellipse-12" checked={selected === "ellipse-12"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-13">
        <input type="radio" value="ellipse-13" checked={selected === "ellipse-13"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-14">
        <input type="radio" value="ellipse-14" checked={selected === "ellipse-14"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-15">
        <input type="radio" value="ellipse-15" checked={selected === "ellipse-15"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-16">
        <input type="radio" value="ellipse-16" checked={selected === "ellipse-16"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-17">
        <input type="radio" value="ellipse-17" checked={selected === "ellipse-17"} onChange={handleRadioChange} />
      </label>
      <label className="ellipse-18">
        <input type="radio" value="ellipse-18" checked={selected === "ellipse-18"} onChange={handleRadioChange} />
      </label>
    </div>
          <div className="text-wrapper-20">Position</div>
          <div className="frame-12">
          <div className="text-wrapper-21" onClick={() => handleTogglePosition("School Nurse")} style={{ display: positions["School Nurse"] ? "block" : "none" }}>School Nurse</div>
          <div className="text-wrapper-18" onClick={() => handleTogglePosition("Registrar")} style={{ display: positions["Registrar"] ? "block" : "none" }}>Registrar</div>
          <div className="text-wrapper-18" onClick={() => handleTogglePosition("Career Adviser")} style={{ display: positions["Career Adviser"] ? "block" : "none" }}>Career Adviser</div>
          <div className="text-wrapper-18" onClick={() => handleTogglePosition("Reading Admin")} style={{ display: positions["Reading Admin"] ? "block" : "none" }}>Reading Admin</div>
          <div className="text-wrapper-18" onClick={() => handleTogglePosition("Administrator")} style={{ display: positions["Administrator"] ? "block" : "none" }}>Administrator</div>
            <div className="text-wrapper-18" onClick={() => handleTogglePosition("Cashier")} style={{ display: positions["Cashier"] ? "block" : "none" }}>Cashier</div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Proware Specialist")} style={{ display: positions["Proware Specialist"] ? "block" : "none" }}>
              Proware <br />
              Specialist
            </div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Maintenance-Officer")} style={{ display: positions["Maintenance-Officer"] ? "block" : "none" }}>
              Maintenance-
              <br />
              Officer
            </div>
            <div className="text-wrapper-18" onClick={() => handleTogglePosition("MIS")} style={{ display: positions["MIS"] ? "block" : "none" }}>MIS</div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Guidance-Associate")} style={{ display: positions["Guidance-Associate"] ? "block" : "none" }}>
              Guidance- <br />
              Associate
            </div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Guidance-Associate")} style={{ display: positions["Guidance-Associate"] ? "block" : "none" }}>
              School-
              <br />
              Administrator
            </div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Admission-Officer")} style={{ display: positions["Admission-Officer"] ? "block" : "none" }}>
              Admission- <br />
              Officer
            </div>
            <div className="text-wrapper-22" onClick={() => handleTogglePosition("Discipline-Officer")} style={{ display: positions["Discipline-Officer"] ? "block" : "none" }}>
              Discipline- <br />
              Officer
            </div>
            <div className="text-wrapper-18" onClick={() => handleTogglePosition("Faculty")} style={{ display: positions["Faculty"] ? "block" : "none" }}>Faculty</div>
          </div>
          <div className="overlap-9" onClick={handleOverlapClick}>
            <div className="text-wrapper-23">Filter</div>
          </div>
        </div>
        <div className="overlap-10">
          <p className="text-wrapper-24">What JOB are you looking for?</p>
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="ellipse-19" />
              <img className="line" alt="Line" src="https://c.animaapp.com/u3FUp8l1/img/line-1.svg" />
            </div>
          </div>
          <div className="overlap-11">
            <div className="text-wrapper-25">Search</div>
          </div>
          <div className="rectangle-6" />
          <Group className="group-13" property1="default" />
        </div>
        <div className="overlap-12">
          <div className="my-objective-is-to-wrapper">
            <p className="my-objective-is-to">
              My objective is to leverage my strong problem-solving skills and experience in network administration to
              contribute to STI&#39;s innovative IT environment. I&#39;m particularly interested in MIS and believe my
              skills can be an asset to your team.&nbsp;&nbsp;This position represents an exciting opportunity to learn
              from industry leaders and grow my expertise in MIS.
            </p>
          </div>
          <div className="text-wrapper-26">Contacts</div>
          <div className="text-wrapper-27">Objective</div>
          <div className="text-wrapper-28">Skills</div>
          <div className="text-wrapper-29">About Guest</div>
          <img className="uis-bag" alt="Uis bag" src="https://c.animaapp.com/u3FUp8l1/img/uis-bag.svg" />
          <div className="frame-13">
            <div className="text-wrapper-30">Primary Industry:</div>
            <div className="text-wrapper-31">Information Technology</div>
          </div>
          <div className="frame-14">
            <div className="text-wrapper-30">Experience:</div>
            <div className="text-wrapper-31">0-2 years</div>
          </div>
          <div className="frame-15">
            <div className="text-wrapper-30">Expected Salary:</div>
            <p className="text-wrapper-31">250,000 - 300,000 per year</p>
          </div>
          <div className="frame-16">
            <div className="text-wrapper-30">Phone:</div>
            <div className="text-wrapper-31">09123456789</div>
          </div>
          <div className="frame-17">
            <div className="text-wrapper-30">Location:</div>
            <div className="text-wrapper-31">Las Piñas City</div>
          </div>
          <div className="frame-18">
            <div className="text-wrapper-30">Email:</div>
            <div className="text-wrapper-31">juandelacruz@gmail.com</div>
          </div>
          <img className="mdi-calendar" alt="Mdi calendar" src="https://c.animaapp.com/u3FUp8l1/img/mdi-calendar.svg" />
          <img
            className="clarity-dollar-solid"
            alt="Clarity dollar solid"
            src="https://c.animaapp.com/u3FUp8l1/img/clarity-dollar-solid.svg"
          />
          <div className="overlap-13">
            <div className="text-wrapper-32">Network</div>
          </div>
          <div className="overlap-14">
            <div className="text-wrapper-33">Programming</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;