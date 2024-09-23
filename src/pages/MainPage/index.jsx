import React from "react";
import { Faq } from "../../components/MainPage/Faq";
import { LearnMore } from "../../components/MainPage/LearnMore";
import { Login } from "components/MainPage/Login/Login";
import  Rectangle3  from "./Rectangle 3.png";
import { SignUp } from "components/MainPage/SignUp/Signup";
import "./style.css";

const MainPage = () => {
  return (
    <div className="main">
      <div className="div-2">
        <footer className="footer">
          <div className="overlap-group">
            <div className="terms-conditions">Terms &amp; conditions</div>
            <div className="text-wrapper-4">Privacy policy</div>
            <img className="vector" alt="Vector" src="vector.svg" />
            <img className="img" alt="Vector" src="image.svg" />
            <img className="vector-2" alt="Vector" src="vector-2.svg" />
            <div className="overlap">
              <div className="text-wrapper-5">Join Us! Contact Here</div>
              <img className="vector-3" alt="Vector" src="vector-3.svg" />
              <div className="text-wrapper-6">288718327</div>
            </div>
            <div className="text-wrapper-7">recruitment@laspinas.sti.edu.ph</div>
            <img className="vector-4" alt="Vector" src="vector-4.svg" />
          </div>
        </footer>
        <div className="overlap-2">
          <div className="body">
            <div className="text-wrapper-8">We Are Hiring</div>
            <p className="p">
              If you are interested, Please click Sign Up and register to create an account. Once the account is
              created, Submit your resume. Goodluck!
            </p>
            <div className="rectangle" />
          </div>
          <LearnMore className="learn-more-instance" />
        </div>
        <div className="overlap-3">
          <header className="header">
            <div className="overlap-4">
              <img className="rectangle-2" alt="Rectangle" src="rectangle-1.png" />
              <img className="image" alt="Image" src="image-1.png" />
              <img className="rectangle-3" alt="Image" src={Rectangle3} />
              <div className="text-wrapper-9">Applicant Tracking System</div>
            </div>
          </header>
          <div className="frame">
            <Faq divClassName="FAQ-instance" />
            <SignUp divClassName="sign-up-instance" property1="default" />
            <Login className="log-in-instance" divClassName="design-component-instance-node" />
          </div>
          <img className="logo" alt="Logo" src="logo1-1.png" />
        </div>
        {/*<Rectangle3 className="rectangle-3-instance" /> */}
      </div>
    </div>
  );
};

export default MainPage;

