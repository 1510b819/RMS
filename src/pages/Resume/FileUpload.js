import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase/firebase'; // Adjust the path to your Firebase config

const FileUpload = ({ onAnalysis, setLoading, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState('resume');
  const [error, setError] = useState(null);

  const storage = getStorage(app);

  useEffect(() => {
    console.log('FileUpload component received userId:', userId);
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

    if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5 MB. Please upload a smaller file.');
        setSelectedFile(null); // Clear the selected file
    } else {
        setSelectedFile(file);
        setError(null);
    }
};

  const handleBrowse = () => {
    document.getElementById('fileInput').click();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('userId', userId);

      setLoading(true);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response from server:', response.data);
        onAnalysis(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Error uploading file. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTypeChange = async (type) => {
    if (selectedFile) {
      const fileRef = ref(storage, `${type}/${userId}/${Date.now()}-${selectedFile.name}`);
      try {
        await uploadBytes(fileRef, selectedFile);
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      }
    } else {
      setSelectedType(type);
    }
  };

  return (
    <div className="file-upload-container">
      <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf,.docx,image/*" className="file-upload-input" />
      <button onClick={handleBrowse} className="file-browse-button">Browse</button>
      <button onClick={handleUpload} className="file-upload-button">Upload Resume</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="file-type-buttons">
        <button onClick={() => handleTypeChange('nbi')} className="file-upload-button">Upload NBI</button>
        <button onClick={() => handleTypeChange('birth_certificate')} className="file-upload-button">Upload Birth Certificate</button>
        <button onClick={() => handleTypeChange('history_of_employment')} className="file-upload-button">Upload History of Employment</button>
        <button onClick={() => handleTypeChange('pre_employment_medical_exam')} className="file-upload-button">Upload Pre Employment Medical Exam</button>
        <button onClick={() => handleTypeChange('pag_ibig')} className="file-upload-button">Upload Pag-Ibig</button>
        <button onClick={() => handleTypeChange('sss')} className="file-upload-button">Upload SSS</button>
        <button onClick={() => handleTypeChange('philhealth')} className="file-upload-button">Upload PhilHealth</button>
      </div>
    </div>
  );
};

export default FileUpload;
