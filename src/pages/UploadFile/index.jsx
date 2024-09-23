import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from "../../firebase/firebase";
import { Link } from 'react-router-dom';
import { LogOut } from "../../components/CandidateModule/LogOut";
import uploadButton from "./icon _data transfer upload_.png";
import sti from '../stilogo.png'
import SevenPercent from "./Progress.png";
import ThirtyPercent from "./Ellipse 3.png";
import rectangle from "./Rectangle 44.png";
import Frame174 from "../HRDashboard/Frame 174.png";
import Phone from "../HRDashboard/Phone.png";
import Message from "../HRDashboard/Message.png";
import SettingsButton from "./Settings.png";
import "./style.css";
import { useAuth } from "../../contexts/authContext";

const UploadFile = () => {
  const storage = getStorage(app);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  useEffect(() => {
    console.log('User ID from state:', userId);
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds 5 MB. Please upload a smaller file.');
        setSelectedFile(null); // Clear the selected file
      } else {
        setSelectedFile(file);
        setError(null);
        // Upload the file if type is already selected
        if (selectedType) {
          handleTypeChange(selectedType, file);
        } else {
          setError('Please select a file type.');
        }
      }
    }
  };

  const handleIconClick = (type) => {
    setSelectedType(type);
    document.getElementById('fileInput').click();
  };

  const handleTypeChange = async (type, file) => {
    if (file && type) {
      const fileRef = ref(storage, `${type}/${userId}/${Date.now()}-${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        alert('File uploaded successfully');
        // Clear file selection after successful upload
        setSelectedFile(null);
        setSelectedType('');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      }
    }
  };

  return (
    <div className="upload-file">
      <div className="div">
        <img className="image" alt="Image" src={sti} />
        <div className="overlap">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
                <Link to="/Settings">
                  <img className="vector" alt="Vector" src={SettingsButton} style={{ cursor: 'pointer' }} />
                </Link>
                <LogOut className="log-out-instance hover-effect" />
              </div>
            </div>
          </div>
          <div className="rectangle-2" />
          <div className="navbar">
            <Link to="/ApplicantDashboard" className="text-wrapper-2 hover-effect">Home</Link>
            <div className="text-wrapper-2 hover-effect">Application</div>
            <div className="text-wrapper-2 hover-effect">About</div>
            <div className="text-wrapper-2 hover-effect">Contact</div>
            <div className="text-wrapper-3">Upload File</div>
          </div>
        </div>
        <div className="overlap-group">
          <img className="rectangle-3" alt="Rectangle" src={rectangle} />
          <div className="terms-conditions">Terms &amp; conditions</div>
          <div className="text-wrapper-4">Privacy policy</div>
          <img className="vector-2" alt="Vector" src={Frame174} />
          <div className="text-wrapper-5">Join Us! Contact Here</div>
          <img className="vector-5" alt="Vector" src={Phone} />
          <div className="text-wrapper-6">288718327</div>
          <div className="text-wrapper-7">recruitment@laspinas.sti.edu.ph</div>
          <img className="vector-6" alt="Vector" src={Message} />
        </div>
        <div className="text-wrapper-8">Filter</div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-4" />
        <div className="text-wrapper-9">NBI Clearance</div>
        <div className="text-wrapper-10">Birth Certificate/PSA</div>
        <div className="text-wrapper-11">Certificate of Employment</div>
        <div className="text-wrapper-12">Pre Employment Medical Exam</div>
        <div className="text-wrapper-13">PAG-IBIG</div>
        <div className="text-wrapper-14">BIR</div>
        <div className="text-wrapper-15">SSS</div>
        <div className="text-wrapper-16">PhilHealth</div>
        {/* Add file input for browsing */}
        <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf,.docx,image/*" className="file-upload-input" />
      <div className="file-type-buttons">
        <div className="icon-data-transfer" onClick={() => handleIconClick('nbi')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-3" onClick={() => handleIconClick('birth_certificate')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-4" onClick={() => handleIconClick('certificate_of_employment')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-5" onClick={() => handleIconClick('pre_employment_medical_exam')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-6" onClick={() => handleIconClick('pag_ibig')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-7" onClick={() => handleIconClick('bir')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-8" onClick={() => handleIconClick('sss')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
        <div className="icon-data-transfer-9" onClick={() => handleIconClick('philhealth')}>
          <img className="icon-data-transfer-2 hover-effect" alt="Icon data transfer" src={uploadButton} />
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="overlap-2">
          <div className="text-wrapper-18">Progress</div>
          <div className="progress">
            <div className="overlap-group-2">
              <img className="ellipse" alt="Ellipse" src={SevenPercent} />
              <div className="text-wrapper-19">70%</div>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-3">
              <img className="ellipse-2" alt="Ellipse" src={ThirtyPercent} />
              <div className="text-wrapper-19">30%</div>
            </div>
          </div>
          <div className="text-wrapper-20">Completed</div>
          <div className="text-wrapper-21">Incomplete</div>
        </div>
        <div className="div-wrapper">
          <div className="text-wrapper-22">Requirements</div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
