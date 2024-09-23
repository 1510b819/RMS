import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Index.css'; 
import { jobPositionCourses } from './Courses'; 
import jobPositions from './JobPositions'; 

const firebaseConfig = {
  apiKey: "AIzaSyAyISKclXIlruWy_a6ScVQOZP72MXk9x0M",
  authDomain: "rpmauth-1e30e.firebaseapp.com",
  projectId: "rpmauth-1e30e",
  storageBucket: "rpmauth-1e30e.appspot.com",
  messagingSenderId: "658715764261",
  appId: "1:658715764261:web:8bd9868d2d36bebe95c1cc"
};

const Index = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobPosition, setSelectedJobPosition] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firebase.firestore().collection('users').get();
        const fetchedUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('An error occurred while fetching users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleJobPositionSelect = (event) => {
    setSelectedJobPosition(event.target.value);
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        let fetchedResumes = [];
        if (selectedUser) {
          const userResumesSnapshot = await firebase.firestore().collection('users').doc(selectedUser).collection('resumes').get();
          fetchedResumes = userResumesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          const resumesSnapshot = await firebase.firestore().collectionGroup('resumes').get();
          fetchedResumes = resumesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        setResumes(fetchedResumes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        setError('An error occurred while fetching resumes.');
        setLoading(false);
      }
    };

    fetchResumes();
  }, [selectedUser]);

  const handleRemoveResume = async (resumeId) => {
    try {
      if (selectedUser) {
        await firebase.firestore().collection('users').doc(selectedUser).collection('resumes').doc(resumeId).delete();
      } else {
        await firebase.firestore().collectionGroup('resumes').doc(resumeId).delete();
      }
      setResumes(resumes.filter(resume => resume.id !== resumeId));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const filteredResumes = selectedJobPosition === ''
    ? resumes
    : resumes.filter(resume => {
        const requiredCourses = jobPositionCourses[selectedJobPosition];
        return (
          resume.Education &&
          resume.Education.Degree &&
          requiredCourses.some(course => resume.Education.Degree.includes(course))
        );
      });

  return (
    <div className="container">
      <h1>Resumes</h1>
      <div className="dropdown">
        <label htmlFor="user">Select User:</label>
        <select id="user" onChange={handleUserSelect} value={selectedUser}>
          <option value="">All Users</option>
          <option value="RjrtB6cFfjbKxLkSjnSStPajgLf2">Josh</option> 
          <option value="HS53qzJdSHgXAQo2FA2nyvreWVt1">Angel</option> 
          <option value="undefined">Franco</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="jobPosition">Select Job Position:</label>
        <select id="jobPosition" onChange={handleJobPositionSelect} value={selectedJobPosition}>
          <option value="">Select...</option>
          {jobPositions.map((position, index) => (
            <option key={index} value={position}>{position}</option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="resume-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Education Degree</th>
            <th>Skills</th>
            <th>Actions</th> {/* Add column for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredResumes.map((resume, index) => (
            <tr key={index}>
              <td>{resume.Names}</td>
              <td>{resume.Emails[0]}</td>
              <td>{resume['Phone Number']}</td>
              <td>{resume.Education && resume.Education.Degree}</td>
              <td>{resume.Skills.join(', ')}</td>
              <td>
                <button onClick={() => handleRemoveResume(resume.id)}>Remove</button> {/* Button to remove the resume */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
