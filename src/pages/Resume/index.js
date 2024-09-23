import React from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import './App.css';
import FileUpload from './FileUpload';
import stilogo from '../stilogo.png';
import { useAuth } from '../../contexts/authContext';

function parseValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  } else if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join(', ');
  } else {
    return value;
  }
}

function App() {
  const { currentUser } = useAuth();
  const userIdFromLocation = currentUser?.uid;

  const [resumeData, setResumeData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAnalysis = (data) => {
    console.log('Received data:', data); // Debugging
    setResumeData(data);
  };

  console.log('resumeData:', resumeData); // Debugging
  console.log('userId:', userIdFromLocation); // Debugging

  return (
    <div className="App">
      <h1>Resume Analyzer</h1>
      <FileUpload userId={userIdFromLocation} onAnalysis={handleAnalysis} setLoading={setIsLoading} />
      {isLoading && <p>Loading...</p>}
      <div>
        <h2>Debugging Result</h2>
        <table className="resume-table">
          <tbody>
            <tr>
              <td colSpan="2">{resumeData ? 'Names' : ''}</td>
              <td colSpan="3">{resumeData ? parseValue(resumeData.Names) : ''}</td>
            </tr>
            <tr>
              <td colSpan="2">{resumeData ? 'Education' : ''}</td>
              <td colSpan="3">{resumeData ? parseValue(resumeData.Education) : ''}</td>
            </tr>
            <tr>
              <td colSpan="2">{resumeData ? 'Skills' : ''}</td>
              <td colSpan="3">{resumeData ? parseValue(resumeData.Skills) : ''}</td>
            </tr>
            <tr>
              <td colSpan="2">{resumeData ? 'Phone Number' : ''}</td>
              <td colSpan="3">{resumeData ? parseValue(resumeData['Phone Number']) : ''}</td>
            </tr>
            <tr>
              <td colSpan="2">{resumeData ? 'Emails' : ''}</td>
              <td colSpan="3">{resumeData ? parseValue(resumeData.Emails) : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="blue-rectangle">
        <img src={stilogo} alt="Logo" className="logo" />
        <div className="white-text">Dashboard Candidate Status Job Posting</div>
      </div>
    </div>
  );
}

export default App;
