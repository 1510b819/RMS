import React, { useState, useEffect, useRef  } from "react";
import { Group } from "../../components/Group";
import { LogOut } from "../../components/CandidateModule/LogOut";
import { Link } from 'react-router-dom';
import "./style.css";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import usePositionToggle from './usePositionToggle';
import { Header } from "../../components/ApplicantDashboard/Header";
import sti from '../stilogo.png'
import SettingsButton from "../UploadFile/Settings.png";
import { useAuth } from '../../contexts/authContext';
import { AddJob } from "../../components/AddJob";
import { addDoc, doc, deleteDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore, storage, auth } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ApplicantDashboard = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 
  const { positions, handleTogglePosition } = usePositionToggle();
  const [selected, setSelected] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('Full time');
  const [slotsLeft, setSlotsLeft] = useState(1);
  const [jobPosts, setJobPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const [search, setSearch] = useState({
    title: '',
    type: '',
    position: '',
    date: ''
  });
  const [selectedJob, setSelectedJob] = useState(null); // State for the selected job
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State for the overlay visibility
  const [jobRequirements, setJobRequirements] = useState(''); 
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

const handleJobCardSelect = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
};

  console.log('User ID from state:', userId);

  const handleApplyClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSizeInBytes = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only PDF and DOCX files are allowed.");
        return;
      }

      if (file.size > maxSizeInBytes) {
        setErrorMessage("File size must be less than 5MB.");
        return;
      }

      setErrorMessage("");
      try {
        // Get the current user's ID
        const userId = auth.currentUser ? auth.currentUser.uid : "anonymous"; // Replace "anonymous" with logic to handle unauthenticated users

        // Create a reference to the resume folder and file
        const fileRef = ref(storage, `resume/${selectedJob.title}/${userId}/${file.name}`);

        // Upload the file
        await uploadBytes(fileRef, file);

        setSuccessMessage("File uploaded successfully!");
        console.log("Uploaded file:", file);
      } catch (error) {
        setErrorMessage("Failed to upload file: " + error.message);
      }
    }
  };

    const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }));
  };
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const jobPostsCollection = collection(firestore, 'Job Posted');
        const q = query(jobPostsCollection); // No need for ordering here
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
  
  

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };
  const handleLogout = () => {
    doSignOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
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

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const handleCardClick = (job) => {
    setSelectedJob(job); 
    setIsOverlayOpen(true); 
  };

  return (
    <div className="applicant-dashboard">
      <div className="div-4">
        <div className="overlap-6">
         {/* <img className="image" alt="Image" src="https://c.animaapp.com/u3FUp8l1/img/image-4@2x.png" /> */}
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
      </div>
    </div>
  ))}
</div>
</div>
        {/*<img className="image-2" alt="Image" src="https://c.animaapp.com/u3FUp8l1/img/image-1@2x.png" />*/}
        <img className="image-2" alt="Image" src={sti} />
        <div className="navbar">
          <div className="rectangle-3" />
          {/* <img className="vector" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector.svg" /> */}
          <Link to="/Settings">
          <img 
            className="vector" 
            alt="Vector" 
            src={SettingsButton}
            style={{ cursor: 'pointer' }}
          />
          </Link>
          {/*<img className="vector-2" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-1.svg" />*/}
          <img className="vector-3" alt="Vector" src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg" />
          <LogOut className="log-out-instance hover-effect" onClick={handleLogout} />
          <div className="text-wrapper-12 hover-effect">Application</div>
          <div className="text-wrapper-13 hover-effect">About</div>
          <div className="text-wrapper-14 hover-effect">Contact</div>
          <Link to="/UploadFile" className="text-wrapper-34 hover-effect">Upload File</Link>
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
          <div className="overlap-9" /*onClick={handleOverlapClick}*/>
            <div className="text-wrapper-23">Filter</div>
          </div>
        </div>
        <div className="overlap-10">
          <div className="row">
        <input 
          type="text" 
          name="title"
          placeholder="Search by title" 
          value={search.title}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
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
        </div>
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
          <div className="text-wrapper-29">About Me</div>
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

{/* Overlay for displaying job details */}
{isOverlayOpen && selectedJob && (
  <div className="overlay">
    <div className="overlay-content">
      <h2>
        <input
          type="text"
          name="title"
          value={selectedJob.title || ""}
          readOnly
          style={styles.input}
        />
      </h2>
      <div className="overlay-description">
        <p><strong>Description:</strong></p>
        <textarea
          name="description"
          value={selectedJob.description || ""}
          readOnly
          style={styles.textarea}
        />
        <p><strong>Requirements:</strong></p>
        <textarea
          name="requirements"
          value={selectedJob.requirements || ""}
          readOnly
          style={styles.textarea}
        />
        <p><strong>Slots left:</strong></p>
        <input
          type="number"
          name="slots"
          value={selectedJob.slots || ""}
          readOnly
          className="overlay-input"
        />
        <p><strong>Job type:</strong></p>
        <select
          name="type"
          value={selectedJob.type || ""}
          disabled
          className="overlay-select"
        >
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
        </select>
      </div>
      <div className="overlay-actions">
        <button className="overlay-close" onClick={handleCloseOverlay}>Close</button>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
        <button className="overlay-apply" onClick={handleApplyClick}>
          Apply
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchInput: {
    marginRight: '10px',
  },

  searchSelect: {
      marginRight: '10px',
      padding: '0px 30px 0px 0', // Adjust padding as needed
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box', // Ensures padding is included in the element's total width
      color: '#333', // Darker text color for better readability
      backgroundColor: '#fff', // White background for better contrast
  },
  
  
  jobCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '50  px',
    borderRadius: '8px',
    border: '1px solid #C6C6C6',
    width: '835px',
    height: '235px',
    backgroundColor: '#FFFFFF',
    marginBottom: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  logo: {
    marginRight: '20px',
    width: '150px',
    height: 'auto',
    marginBottom: '50px',
    marginLeft: '50px',
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  campus: {
    fontSize: '18px',
    fontFamily: 'DM Sans',
    fontWeight: '400',
    color: '#141414',
    margin: '0 0 10px 0',
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
  title: {
    fontSize: '24px',
    fontFamily: 'DM Sans',
    fontWeight: '500',
    color: '#141414',
    margin: '0 0 10px 0',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    width: '16px', // Adjust as needed
    height: '16px', // Adjust as needed
    marginRight: '5px',
  },
  info: {
    fontSize: '16px',
    fontFamily: 'DM Sans',
    fontWeight: '400',
    color: '#141414',
    marginRight: '15px',
  },
  description: {
    fontSize: '16px',
    fontFamily: 'DM Sans',
    fontWeight: '400',
    color: '#141414',
    margin: '0 0 10px 0',
  },
  removeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontFamily: 'DM Sans',
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor: '#FF4C4C',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '15px',
    right: '15px',
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


export default ApplicantDashboard;