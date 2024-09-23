import React from 'react';
import './index.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
      <h1>Terms and Conditions</h1>
      <div className="content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          STI College Las Piñas reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after any changes constitutes acceptance of the new Terms.
        </p>

        <h2>3. Information Use</h2>
        <p>
          STI College Las Piñas reserves the right to use all gathered information at any time or for any reason at our sole discretion without notice. However, we have no right to alter any information from our users. The information gathered will remain confidential and will be used solely for relevant academic purposes.
        </p>

        <h2>4. User Responsibilities</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their accounts and passwords. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          STI College Las Piñas shall not be liable for any damages arising out of the use or inability to use our services. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of the Philippines. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of the Philippines.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms and Conditions, please contact us at <a href="mailto:support@sticollegelaspinas.edu.ph">support@sticollegelaspinas.edu.ph</a>
        </p>
      </div>
      <div className="checkbox-container">
        <label>
          <span><a href="/privacy-notice" target="_blank" rel="noopener noreferrer">Privacy Notice</a></span>
        </label>
      </div>
    </div>
  );
};

export default TermsAndConditions;
