import React from 'react';
import sti from './stilogo.png'; // Ensure the path is correct

const JobCard = ({ job, onDelete }) => {
  return (
    <div style={styles.jobCard}>
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
        <button onClick={onDelete} style={styles.removeButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
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
    top: '40px',
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
  },
  removeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '4px',
  },
  campus: {
    fontSize: '18px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '400',
    color: '#141414',
    marginBottom: '10px',
  },
  title: {
    fontSize: '24px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '700',
    color: '#141414',
    marginBottom: '10px',
  },
};

export default JobCard;
