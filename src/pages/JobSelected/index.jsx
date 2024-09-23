import React from "react";
import "./style.css";
import Back from "../Settings/Back.png";
import { LogOut } from "../../components/CandidateModule/LogOut";
import SettingsButton from "../UploadFile/Settings.png";
import Frame174 from "../HRDashboard/Frame 174.png";
import Phone from "../HRDashboard/Phone.png";
import Message from "../HRDashboard/Message.png";
import sti from "../stilogo.png";
import { useNavigate, Link } from 'react-router-dom';


const JobSelected = () => {
  return (
    <div className="job-selected">
      <div className="div">
        <img className="image" alt="Image" src="image-1.png" />
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
                <Link to="/Settings"><img className="img" alt="Vector" src={SettingsButton} /></Link>
                <LogOut divClassName="log-out-instance" />
              </div>
            </div>
          </div>
          <div className="rectangle-2" />
          <div className="navbar">
            <div className="text-wrapper-2">Home</div>
            <div className="text-wrapper-3">Application</div>
            <div className="text-wrapper-3">About</div>
            <div className="text-wrapper-3">Contact</div>
            <Link to="/UploadFile" className="text-wrapper-3">Upload File</Link>
          </div>
        </div>
        <div className="overlap">
          <div className="rectangle-3" />
          <div className="terms-conditions">Terms &amp; conditions</div>
          <div className="text-wrapper-4">Privacy policy</div>
          <img className="vector-2" alt="Vector" src={Frame174} />
          <img className="vector-3" alt="Vector" src="image.svg" />
          <img className="vector-4" alt="Vector" src="vector-2.svg" />
          <div className="text-wrapper-5">Join Us! Contact Here</div>
          <img className="vector-5" alt="Vector" src={Phone} />
          <div className="text-wrapper-6">288718327</div>
          <div className="text-wrapper-7">recruitment@laspinas.sti.edu.ph</div>
          <img className="vector-6" alt="Vector" src={Message} />
        </div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-4" />
        <div className="div-wrapper">
          <div className="frame-3">
            <div className="frame-4">
              <div className="text-wrapper-8">School Nurse</div>
              <img className="logo-2" alt="Logo" src={sti} />
              <div className="frame-5">
                <div className="frame-6">
                  <img className="img-2" alt="Map pin line" src="https://c.animaapp.com/u3FUp8l1/img/mappinline-1.svg" />
                  <div className="text-wrapper-9">Las Piñas</div>
                </div>
                <div className="ellipse" />
                <div className="frame-7">
                  <img className="img-2" alt="Clock" src="https://c.animaapp.com/u3FUp8l1/img/clock-1.svg" />
                  <div className="text-wrapper-9">Full time</div>
                </div>
                <div className="ellipse" />
                <div className="frame-8">
                  <img className="img-2" alt="Calendar blank" src="https://c.animaapp.com/u3FUp8l1/img/calendarblank-1.svg" />
                  <div className="text-wrapper-9">29 min ago</div>
                </div>
              </div>
              <div className="text-wrapper-10">STI College Las Piñas</div>
            </div>
          </div>
        </div>
        <div className="frame-9">
          <div className="text-wrapper-11">Requirements</div>
          <div className="frame-10">
            <div className="ellipse-2" />
            <p className="text-wrapper-12">Bachelor&#39;s degree holders in Nursing</p>
          </div>
          <div className="frame-10">
            <div className="ellipse-2" />
            <div className="text-wrapper-12">Registered Nurse</div>
          </div>
          <div className="frame-10">
            <div className="ellipse-2" />
            <div className="text-wrapper-12">With updated PRC license</div>
          </div>
          <div className="frame-10">
            <div className="ellipse-2" />
            <p className="p">Identify and treat health problems, among students and employees.</p>
          </div>
          <div className="frame-10">
            <p className="evaluates-the">
              &nbsp;&nbsp;&nbsp;&nbsp; Evaluates the physical condition of students/employees, and refers them to <br />
              appropriate resources as needed.
            </p>
            <div className="ellipse-3" />
          </div>
          <div className="frame-10">
            <div className="ellipse-2" />
            <p className="text-wrapper-12">Willing to assign at Las Piñas City</p>
          </div>
        </div>
        <div className="frame-11">
          <div className="frame-12">
            <div className="text-wrapper-13">Apply Now</div>
          </div>
          <div className="text-wrapper-14">2/3</div>
        </div>
        <div className="overlap-2">
          <div className="frame-13">
            <div className="text-wrapper-15">About Me</div>
            <div className="frame-14">
              <img className="img-3" alt="Uis bag" src="https://c.animaapp.com/u3FUp8l1/img/uis-bag.svg" />
              <div className="frame-15">
                <div className="text-wrapper-16">Primary Industry:</div>
                <div className="text-wrapper-17">Information Technology</div>
              </div>
            </div>
            <div className="frame-14">
              <img className="img-3" alt="Mdi calendar" src="https://c.animaapp.com/u3FUp8l1/img/mdi-calendar.svg" />
              <div className="frame-15">
                <div className="text-wrapper-16">Experience:</div>
                <div className="text-wrapper-17">0-2 years</div>
              </div>
            </div>
            <div className="frame-14">
              <img className="img-3" alt="Clarity dollar solid" src="https://c.animaapp.com/u3FUp8l1/img/clarity-dollar-solid.svg" />
              <div className="frame-15">
                <div className="text-wrapper-16">Expected Salary:</div>
                <p className="text-wrapper-17">250,000 - 300,000 per year</p>
              </div>
            </div>
            <div className="frame-16">
              <div className="text-wrapper-18">Contacts</div>
              <div className="frame-15">
                <div className="text-wrapper-16">Phone:</div>
                <div className="text-wrapper-17">09123456789</div>
              </div>
              <div className="frame-15">
                <div className="text-wrapper-16">Email:</div>
                <div className="text-wrapper-17">juandelacruz@gmail.com</div>
              </div>
              <div className="frame-15">
                <div className="text-wrapper-16">Location:</div>
                <div className="text-wrapper-17">Las Piñas City</div>
              </div>
            </div>
            <div className="frame-17">
              <div className="text-wrapper-15">Objective</div>
              <div className="my-objective-is-to-wrapper">
                <p className="my-objective-is-to">
                  My objective is to leverage my strong problem-solving skills and experience in network administration
                  to contribute to STI&#39;s innovative IT environment. I&#39;m particularly interested in MIS and
                  believe my skills can be an asset to your team.&nbsp;&nbsp;This position represents an exciting
                  opportunity to learn from industry leaders and grow my expertise in MIS.
                </p>
              </div>
            </div>
            <div className="text-wrapper-19">Skills</div>
            <div className="frame-18">
              <div className="text-wrapper-20">Network</div>
            </div>
          </div>
          <div className="frame-19">
            <div className="text-wrapper-20">Programming</div>
          </div>
        </div>
        <div className="frame-20">
          <div className="text-wrapper-21">Note:</div>
          <p className="to-ensure-your">
            *To ensure your application is accurately evaluated, please align your resume closely <br />
            with the job requirements and skills detailed in this posting. Our initial screening is <br />
            conducted through an automated resume parser that relies on this information. Only <br />
            candidates identified by this technology will be further reviewed by our HR team. <br />
            Your attention to detail is appreciated.
          </p>
        </div>
        <Link to="/ApplicantDashboard">
         <img className="vector-7" alt="Vector" src={Back} />
        </Link>
      </div>
    </div>
  );
};

export default JobSelected;

