import React, { useState, useEffect } from "react";
import { Candidate } from "../../components/Job/Candidate";
import { Create } from "../../components/Create";
import { Dashboard } from "../../components/CandidateModule/Dashboard";
import { Edit } from "../../components/Job/Edit";
import { Find } from "../../components/Find";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { PropertyDefault } from "../../components/Job/PropertyDefault";
import { Status } from "../../components/CandidateModule/Status";
import { Link } from 'react-router-dom';
import "./JobPostingStyle.css";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import sti from '../stilogo.png';
import { AddJob } from "../../components/AddJob";
import { addDoc, doc, deleteDoc, collection, getDocs, query, orderBy, updateDoc } from "firebase/firestore";
import { firestore } from '../../firebase/firebase';

const JobPosting = () => {
  const navigate = useNavigate(); 
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('Full time');
  const [slotsLeft, setSlotsLeft] = useState(1);
  const [jobPosts, setJobPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState({
    title: '',
    type: '',
    position: '',
    date: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); 
  const [jobRequirements, setJobRequirements] = useState(''); 
  
  const handleRemoveJob = async (event, index) => {
    event.stopPropagation();
  
    const jobPostToRemove = jobPosts[index];
  
    try {
      // Remove the job post from Firestore
      await deleteDoc(doc(firestore, 'Job Posted', jobPostToRemove.id));
  
      // Remove the job post from local state
      setJobPosts(jobPosts.filter((_, i) => i !== index));
  
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };
  

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const jobPostsCollection = collection(firestore, 'Job Posted');
        const q = query(jobPostsCollection); 
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        jobs.sort((a, b) => {
          const dateA = new Date(a.timePosted);
          const dateB = new Date(b.timePosted);
          
          return dateB - dateA;
        });
  
        setJobPosts(jobs);
      } catch (e) {
        console.error("Error fetching job posts: ", e);
      }
    };
    fetchJobPosts();
  }, []);
  

  const handlePostJob = async () => {
    if (jobTitle && jobDescription) {
  
      const now = new Date();
      const timePosted = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
      // Ensure slotsLeft is a whole number, fallback to 1 if not valid
      const validSlotsLeft = Number.isInteger(slotsLeft) && slotsLeft > 0 ? slotsLeft : 1;
  
      try {
        // Check if the job with the same title already exists
        const existingJob = jobPosts.find(job => job.title.toLowerCase() === jobTitle.toLowerCase());
  
        if (existingJob) {
          // If the job exists, update its slotsLeft value
          const updatedSlotsLeft = existingJob.slots + validSlotsLeft;
          const jobDocRef = doc(firestore, 'Job Posted', existingJob.id);
  
          // Update the job's slots in Firestore
          await updateDoc(jobDocRef, {
            slots: updatedSlotsLeft
          });
  
          // Update the local state with the new slotsLeft value
          const updatedJobPosts = jobPosts.map(job =>
            job.id === existingJob.id
              ? { ...job, slots: updatedSlotsLeft }
              : job
          );
          setJobPosts(updatedJobPosts);
  
        } else {
          // If the job doesn't exist, create a new job post
          const newJobPost = {
            title: jobTitle,
            description: jobDescription,
            type: jobType,
            slots: validSlotsLeft,
            requirements: jobRequirements,
            timePosted,
          };
  
          // Add the new job post to the "Job Posted" collection in Firestore
          const docRef = await addDoc(collection(firestore, 'Job Posted'), newJobPost);
  
          // Add the document ID to the job post object
          const jobPostWithId = { ...newJobPost, id: docRef.id };
  
          // Update local state with the new job post
          setJobPosts([jobPostWithId, ...jobPosts]);
        }
  
        // Clear the form and close the modal
        setJobTitle('');
        setJobDescription('');
        setSlotsLeft(1);
        setJobRequirements('');
        setIsModalOpen(false);
  
      } catch (e) {
        console.error("Error adding or updating document: ", e);
      }
    }
  };
  
  
  const handleUpdateJob = async () => {
    console.log("Updating job with data:", selectedJob);
  
    const { title, description, requirements, slots, type, id } = selectedJob;
  
    // Check if all required fields are present
    if (title && description && slots !== undefined && type) {
      console.log("Updating job:", selectedJob);
      console.log("New values:", {
        title,
        description,
        slots,
        requirements,
        type
      });
  
      try {
        const jobDocRef = doc(firestore, 'Job Posted', id);
  
        await updateDoc(jobDocRef, {
          title,
          description,
          slots,
          requirements,
          type
        });

        const updatedJobPosts = jobPosts.map(job =>
          job.id === id
            ? { ...job, title, description, slots, requirements, type }
            : job
        );
  
        setJobPosts(updatedJobPosts);
        setIsOverlayOpen(false);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      console.error("Missing data for update:", selectedJob);
    }
  };
  

  const handleOverlayChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to ${value}`);
    setSelectedJob(prevJob => ({
      ...prevJob,
      [name]: value
    }));
  };
  
  

  const handleCardClick = (job) => {
    setSelectedJob(job); // Set the selected job
    setIsOverlayOpen(true); // Open the overlay
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false); // Close the overlay
  };
  
  
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    doSignOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }));
  };

  const filteredPosts = jobPosts.filter(post => 
    (search.title === '' || post.title.toLowerCase().includes(search.title.toLowerCase())) &&
    (search.type === '' || post.type === search.type) &&
    (search.position === '' || post.title === search.position) &&
    (search.date === '' || post.timePosted.includes(search.date))
  );

  
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="job-posting">
      <div className="div-2">
        <div className="ellipse" />
        <img className="image" alt="Image" src={sti} />
        <div className="overlap"> 
          <div className="rectangle" />
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b7Lhz5U5/img/vector.svg" />
          <img className="img" alt="Vector" src="https://c.animaapp.com/b7Lhz5U5/img/vector-1.svg" />
          <img className="vector-2" alt="Vector" src="https://c.animaapp.com/b7Lhz5U5/img/vector-2.svg" />
          <div className="rectangle-2" />
          <div className="text-wrapper-9">Job Posting</div>
          <Link to="/HRDashboard" className="dashboard-instance hover-effect"><Dashboard /></Link>
          <Link to="/Candidate" className="candidate-instance hover-effect"> <Candidate /></Link>
          <Link to="/Status" className="status-instance hover-effect"><Status /></Link>
          <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
        </div>
        <div className="rectangle-3" />
        <div className="text-wrapper-10">{jobPosts.length} Jobs Posted</div>
        <div className="rectangle-4" />
        <div className="overlap-group">

      {/* Search Feature */}
        <input 
          type="text" 
          name="title"
          placeholder="Search by title" 
          value={search.title}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <label style={styles.label}>Type of Job:</label>
        <select 
          name="type"
          value={search.type}
          onChange={handleSearchChange}
          style={styles.searchSelect}
        >
          <option value="">All Types</option>
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
        </select>
        <label style={styles.label}>Position:</label>
        <select 
          name="position"
          value={search.position}
          onChange={handleSearchChange}
          style={styles.searchSelect}
        >
          <option value="">All Positions</option>
          {Array.from(new Set(jobPosts.map(post => post.title))).map(title => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
        <label style={styles.label}>Date of Posting:</label>
        <input 
          type="text" 
          name="date"
          placeholder="Search by date" 
          value={search.date}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>
        <AddJob onClick={openModal} className="find-instance-1" />
        <div className="overlap-2">
          <div className="frame-2">
            <div className="ellipse-2" />
            <div className="text-wrapper-16">Registrar</div>
          </div>
          <div className="text-wrapper-17">Create job posting</div>
          <div className="frame-3">
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">Proware Specialist</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">Maintenance Officer</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">MIS</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">Guidance Associate</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">School Administrator</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">Admission Officer</div>
            </div>
            <div className="frame-4">
              <div className="ellipse-2" />
              <div className="text-wrapper-16">Discipline Officer</div>
            </div>
          </div>
          <div className="frame-5">
            <div className="text-wrapper-18">Position</div>
            <div className="frame-6">
              <div className="frame-4">
                <div className="ellipse-2" />
                <div className="text-wrapper-16">School Nurse</div>
              </div>
              <div className="frame-4">
                <div className="ellipse-2" />
                <div className="text-wrapper-16">Career Adviser</div>
              </div>
              <div className="frame-4">
                <div className="ellipse-2" />
                <div className="text-wrapper-16">Reading Admin</div>
              </div>
              <div className="frame-4">
                <div className="ellipse-2" />
                <div className="text-wrapper-16">Administrator</div>
              </div>
              <div className="frame-4">
                <div className="ellipse-2" />
                <div className="text-wrapper-16">Cashier</div>
              </div>
            </div>
          </div>
          <div className="frame-7">
            <div className="ellipse-wrapper">
              <div className="ellipse-3" />
            </div>
            <div className="text-wrapper-16">Faculty</div>
          </div>
          <Create className="create-instance" />
        </div>
        {/* Modal for Adding New Job */}
        {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={styles.textarea}
            />
            <input
              type="number"
              placeholder="Slots Left"
              value={slotsLeft}
              onChange={(e) => setSlotsLeft(Number(e.target.value))}
              style={styles.input}
            />
            <select 
              value={jobType} 
              onChange={(e) => setJobType(e.target.value)} 
              style={styles.select}
            >
              <option value="Full time">Full time</option>
              <option value="Part time">Part time</option>
            </select>
            <textarea 
            placeholder="Job Requirements"
            value={jobRequirements} 
            style={styles.textarea}
            onChange={(e) => setJobRequirements(e.target.value)} 
          />
            <button
            onClick={handlePostJob}
      style={{
        ...styles.postButton,
        ...(isHovered ? styles.postButtonHover : {}),
        ...(isActive ? styles.postButtonActive : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      Post
    </button>
            <button onClick={closeModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
        )}
        
        <div style={styles.centerContainer}>
      {currentPosts.map((job, index) => (
        <div key={index} style={styles.jobCard} onClick={() => handleCardClick(job)}>
          <img src={sti} alt="STI Logo" style={styles.logo} />
          <div style={styles.cardContent}>
            <h4 style={styles.campus}>STI Las Piñas Campus</h4>
            <h3 style={styles.title}>{job.title}</h3>
            <div style={styles.infoContainer}>
              <img src="https://c.animaapp.com/b7Lhz5U5/img/mappinline-1.svg" alt="Slots Left" style={styles.icon} />
              <span style={styles.info}>{job.slots} slots left</span>
              <img src="https://c.animaapp.com/b7Lhz5U5/img/clock-1.svg" alt="Job Type" style={styles.icon} />
              <span style={styles.info}>{job.type}</span>
              <img src="https://c.animaapp.com/b7Lhz5U5/img/calendarblank-1.svg" alt="Posted At" style={styles.icon} />
              <span style={styles.info}>Posted at {job.timePosted}</span>
            </div>
            <p style={styles.description}>{job.description}</p>
            <button onClick={(event) => handleRemoveJob(event, index)} style={styles.removeButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    {/* Overlay for displaying job details */}
    {isOverlayOpen && selectedJob && (
  <div className="overlay">
    <div className="overlay-content">
      <h2>
        <input
          type="text"
          name="title"
          value={selectedJob.title || ""}
          onChange={handleOverlayChange}
          style={styles.input}
        />
      </h2>
      <div className="overlay-description">
        <p><strong>Description:</strong></p>
        <textarea
          name="description"
          value={selectedJob.description || ""}
          onChange={handleOverlayChange}
          style={styles.textarea}
        />
        <p><strong>Requirements:</strong></p>
        <textarea
          name="requirements"
          value={selectedJob.requirements || ""}
          onChange={handleOverlayChange}
          style={styles.textarea}
        />
        <p><strong>Slots left:</strong></p>
        <input
          type="number"
          name="slots"
          value={selectedJob.slots || ""}
          onChange={handleOverlayChange}
          className="overlay-input"
        />
        <p><strong>Job type:</strong></p>
        <select
          name="type"
          value={selectedJob.type || ""}
          onChange={handleOverlayChange}
          className="overlay-select"
        >
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
        </select>
      </div>
      <div className="overlay-update-close">
        <button className="overlay-close" onClick={handleCloseOverlay}>Close</button>
        <button className="overlay-update" onClick={handleUpdateJob}>Update</button>
      </div>
    </div>
  </div>
)}


<div className="pagination-container" style={styles.pagination}>
  <button 
    className="pagination-button" 
    onClick={() => handlePageChange(currentPage - 1)} 
    disabled={currentPage === 1}
    style={styles.pageButton}
  >
    &laquo; Prev
  </button>
  {Array.from({ length: totalPages }, (_, index) => (
    <button 
      key={index + 1} 
      className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`} 
      onClick={() => handlePageChange(index + 1)}
      style={{
        ...styles.pageButton,
        ...(currentPage === index + 1 ? styles.activePageButton : {}),
      }}
    >
      {index + 1}
    </button>
  ))}
  <button 
    className="pagination-button" 
    onClick={() => handlePageChange(currentPage + 1)} 
    disabled={currentPage === totalPages}
    style={styles.pageButton}
  >
    Next &raquo;
  </button>
</div>

        
      </div>
    </div>
  );
};

const styles = {
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '321px',
    width: '100%',
    left: '-60px',
    boxSizing: 'border-box',
    zIndex: 1, 
  },
  jobCard: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #C6C6C6',
    margin: '10px',
    padding: '10px',
    width: '820px',
    height: '235px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
  },
  logo: {
    position: 'absolute',
    top: '50px',
    left: '50px',
    width: '160px',
    height: '90px',
    margin: '0',
  },
  cardContent: {
    marginLeft: '150px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  overlayContent: {
    backgroundColor: '#ffffff',  // White background
    padding: '30px',
    borderRadius: '8px',  // Rounded corners
    width: '600px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  // Subtle shadow for depth
    border: '1px solid #C6C6C6',  // Optional: Light grey border
    boxSizing: 'border-box',  // Ensures padding is included in the width
  },
  searchContainer: {
    position: 'absolute',
    top: '321px',
    left: '50%',  // Center horizontally
    transform: 'translateX(-50%)',  // Center the container
    width: '280px',  // Slightly narrower width
    padding: '20px 15px',  // Padding on left and right
    backgroundColor: '#f4f4f4',
    border: '0.5px solid #C6C6C6',
    borderRadius: '12px',  // More rounded corners
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  searchInput: {
    display: 'block',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',  // Adjust width for padding
    padding: '10px',
    border: '1px solid #C6C6C6',
    borderRadius: '8px',  // More rounded corners
    fontSize: '14px',  // Smaller font size
    fontFamily: 'DM Sans, sans-serif',
    boxSizing: 'border-box',
    marginTop: '10px',
  },
  searchSelect: {
    display: 'block',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',  // Adjust width for padding
    padding: '10px',
    border: '1px solid #C6C6C6',
    borderRadius: '8px',  // More rounded corners
    fontSize: '14px',  // Smaller font size
    fontFamily: 'DM Sans, sans-serif',
    boxSizing: 'border-box',
  },
  campus: {
    fontSize: '18px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '400',
    color: '#141414',
  },
  title: {
    fontSize: '24px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '700',
    color: '#141414',
    marginBottom: '10px',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px',
  },
  info: {
    fontSize: '16px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '400',
    color: '#141414',
    marginLeft: '4px',
    marginRight: '12px',
  },
  icon: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
  description: {
    fontSize: '16px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '400',
    color: '#141414',
    overflow: 'hidden',          // Hide overflowing text
    textOverflow: 'ellipsis',    // Display ellipsis at the end of the text
    whiteSpace: 'nowrap',        // Prevent text from wrapping to the next line
    width: '300px',              // Adjust width to fit approximately 50 characters
  },
  
  addButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '450px',
    textAlign: 'center',
    position: 'relative',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #C6C6C6',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    display: 'block',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',
    padding: '10px',
    height: '100px',
    border: '1px solid #C6C6C6',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  select: {
    display: 'block',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #C6C6C6',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  postButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px',
    backgroundColor: '#007bff', // Primary color for the button
    color: '#fff', // Text color
    border: 'none', // Remove default border
    borderRadius: '5px', // Slightly rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    transition: 'background-color 0.3s, transform 0.2s', // Smooth transitions for hover effects
  },
  postButtonHover: {
    backgroundColor: '#0056b3', // Darker shade for hover effect
    transform: 'scale(1.05)', // Slightly enlarge button on hover
  },
  postButtonActive: {
    backgroundColor: '#003d7a', // Even darker shade for active state
    transform: 'scale(1)', // Reset size when button is pressed
  },
  closeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#e0e0e0',
    border: 'none',
  },
  removeButton: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: '#fff', // Optional: add background color to distinguish the controls
    borderTop: '1px solid #ddd', // Optional: add a border on top
    padding: '10px',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Optional: add a shadow for better visibility
    zIndex: '10',
  },
  pageButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 5px',
    border: '1px solid #ddd', // Optional: add a border for better definition
    borderRadius: '5px', // Optional: add rounded corners
    backgroundColor: '#f5f5f5', // Optional: add a background color
  },
  activePageButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
};



export default JobPosting;
