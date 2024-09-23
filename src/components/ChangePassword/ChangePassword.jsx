import React from "react";
import "./style.css";
import Check from "./Check.png";

export const ChangePassword = () => {
  return (
    <div className="change-password-container">
      <div className="change-password-inner">
        <div className="change-password-frame">
          <div className="change-password-frame-wrapper">
            <div className="change-password-title-frame">
              <div className="change-password-title">Change your password</div>
              <div className="change-password-current-section">
                <div className="change-password-current-field">
                  <div className="change-password-current-label">Your current password</div>
                  <div className="change-password-input" />
                </div>
                <div className="change-password-forgot-link">Forgot current password?</div>
              </div>
              <div className="change-password-new-section">
                <div className="change-password-new-field">
                  <div className="change-password-current-label">Your new password</div>
                  <div className="change-password-input" />
                </div>
              </div>
              <div className="change-password-strength-section">
                <div className="change-password-strength-bar" />
                <div className="change-password-strength-label">Excellent</div>
              </div>
              <div className="change-password-requirements">
                <div className="change-password-requirements-label">Must contain at least</div>
                <div className="change-password-requirements-list">
                  <div className="change-password-requirement">
                    <img className="change-password-check-icon" alt="Check" src={Check} />
                    <div className="change-password-requirement-text">at least 8 characters long</div>
                  </div>
                  <div className="change-password-requirement">
                    <img className="change-password-check-icon" alt="Check" src={Check} />
                    <div className="change-password-requirement-text">at least one uppercase letter</div>
                  </div>
                  <div className="change-password-requirement">
                    <img className="change-password-check-icon" alt="Check" src={Check} />
                    <div className="change-password-requirement-text">at least one lowercase letter</div>
                  </div>
                  <div className="change-password-requirement">
                    <img className="change-password-check-icon" alt="Check" src={Check} />
                    <div className="change-password-requirement-text">at least one digit</div>
                  </div>
                  <div className="change-password-requirement">
                    <img className="change-password-check-icon" alt="Check" src={Check} />
                    <div className="change-password-requirement-text">at least one special character</div>
                  </div>
                </div>
              </div>
              <div className="change-password-repeat-field">
                <div className="change-password-current-label">Repeat the new password</div>
                <div className="change-password-input" />
              </div>
              <div className="change-password-submit-button">
                <div className="change-password-submit-text">Change password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
