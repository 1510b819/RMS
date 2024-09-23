import React, { useState, useEffect } from "react";
import { LogOut } from "../../components/CandidateModule/LogOut";
import "./style.css";
import sti from "../stilogo.png";
import Back from "../Settings/Back.png";
import Frame174 from "../HRDashboard/Frame 174.png";
import Phone from "../HRDashboard/Phone.png";
import Message from "../HRDashboard/Message.png";
import SettingsButton from "../UploadFile/Settings.png";
import EditIcon from "./EditIcon.png";
import ProfileIcon from "../Settings/ProfileIcon.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { firestore, database } from "../../firebase/firebase"; // Import Firestore
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"; // Import Firestore functions
import { doc, setDoc } from "firebase/firestore";
import { ref, set, getDatabase, get } from "firebase/database";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const [resumeName, setResumeName] = useState("Juan Dela Cruz");
  const [email, setEmail] = useState("juandelacruz@gmail.com");
  const [phone, setPhone] = useState("09123456789");
  const [skills, setSkills] = useState("Network, Programming");
  const [industry, setIndustry] = useState("Information Technology");
  const [salary, setSalary] = useState("25,000 /mon");
  const [experience, setExperience] = useState("0-2 years");
  const [country, setCountry] = useState("Philippines");
  const [city, setCity] = useState("Las Piñas");
  const [province, setProvince] = useState("Metro Manila");
  const [postal, setPostal] = useState("1750");
  const [barangay, setBarangay] = useState("Almanza Uno");
  const userId = currentUser?.uid;

  const [isEditing, setIsEditing] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [isEditing3, setIsEditing3] = useState(false);

 useEffect(() => {
  const fetchProfileOrResume = async () => {
    try {
      const db = getDatabase(); // Initialize Firebase Realtime Database
      const profileRef = ref(db, `users/${userId}/profile`);

      // Check for existing profile in Realtime Database
      const profileSnapshot = await get(profileRef);
      if (profileSnapshot.exists()) {
        // Profile exists, extract data and update state
        const profileData = profileSnapshot.val();

        // Assuming similar structure as Firestore resume data
        const name = profileData.resumeName || "Juan Dela Cruz";
        setResumeName(name.trim());

        const email = profileData.email || "juandelacruz@gmail.com";
        setEmail(email.trim());

        const phone = profileData.phone || "09123456789";
        setPhone(phone.trim());

        const skills = profileData.skills || "Network, Programming";
        setSkills(skills.trim());
        
        const industry = profileData.industry || "Information Technology";
        setIndustry(industry.trim());

      } else {
        // No profile found, proceed with fetching the latest resume from Firestore
        if (userId) {
          const resumesRef = collection(firestore, `users/${userId}/resumes`);
          const latestResumeQuery = query(
            resumesRef,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(latestResumeQuery);

          if (!querySnapshot.empty) {
            const latestResume = querySnapshot.docs[0].data();

            // Extract and validate the name from the 'Names' field
            const nameArray = latestResume.Names || [];
            const name = nameArray.length > 0 ? nameArray[0].trim() : "";
            setResumeName(name || "Juan Dela Cruz");

            // Extract and validate the email
            const email = (latestResume.Email || "").trim();
            setEmail(email || "juandelacruz@gmail.com");

            // Extract and validate the phone
            const phone = (latestResume.Phone || "").trim();
            setPhone(phone || "09123456789");

            // Extract and validate the skills
            const skillsArray = latestResume.Skills || [];
            const skills =
              skillsArray.length > 0
                ? skillsArray.map((skill) => skill.trim()).join(", ")
                : "";
            setSkills(skills || "Network, Programming");

            const industry = (latestResume.Industry || "").trim();
            setIndustry(industry || "Information Technology");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile or latest resume:", error);
    }
  };

  if (userId) {
    fetchProfileOrResume();
  }
}, [userId]);

  const saveProfile = async () => {
    if (userId) {
      try {
        const userDocRef = doc(firestore, `users/${userId}/profile`, "info");
        await setDoc(userDocRef, {
          resumeName,
          email,
          phone,
          skills,
          timestamp: new Date(),
          industry,
          salary,
          experience,
          country,
          city,
          province,
          postal,
          barangay,
        });

        // Save profile info to Realtime Database
        const userRef = ref(database, `users/${userId}/profile`);
        await set(userRef, {
          resumeName,
          email,
          phone,
          skills,
          timestamp: new Date().toISOString(),
          industry,
          salary,
          experience,
          country,
          city,
          province,
          postal,
          barangay,
        });

        alert("Profile saved successfully!");
      } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile. Please try again.");
      }
    }
  };

  const fetchLatestResume = async () => {};

  return (
    <div className="my-profile">
      <div className="div">
        <img className="image" alt="Image" src="image-1.png" />
        <div className="overlap">
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <img
                  className="vector"
                  alt="Vector"
                  src="https://c.animaapp.com/u3FUp8l1/img/vector-2.svg"
                />
                <img className="img" alt="Vector" src={SettingsButton} />
                <LogOut divClassName="log-out-instance" />
              </div>
            </div>
          </div>
          <div className="navbar">
            <div className="text-wrapper-2">Home</div>
            <div className="text-wrapper-2">Application</div>
            <div className="text-wrapper-2">About</div>
            <div className="text-wrapper-2">Contact</div>
            <div className="text-wrapper-2">Upload File</div>
          </div>
        </div>
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="terms-conditions">Terms &amp; conditions</div>
          <div className="text-wrapper-3">Privacy policy</div>
          <img className="vector-2" alt="Vector" src={Frame174} />
          <div className="text-wrapper-4">Join Us! Contact Here</div>
          <img className="vector-5" alt="Vector" src={Phone} />
          <div className="text-wrapper-5">288718327</div>
          <div className="text-wrapper-6">recruitment@laspinas.sti.edu.ph</div>
          <img className="vector-6" alt="Vector" src={Message} />
        </div>
        <img className="logo" alt="Logo" src={sti} />
        <div className="rectangle-2" />
        <div className="overlap-2">
          <div className="frame-3">
            <img className="icon-person" alt="Icon person" src={ProfileIcon} />
            <div className="frame-4">
              {isEditing ? (
                // Editable fields
                <div className="edit-fields">
                  <input
                    className="text-wrapper-7"
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                  />
                  <input
                    className="text-wrapper-8"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                  <input
                    className="text-wrapper-8"
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                  />
                  <input
                    className="text-wrapper-8"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <div className="text-wrapper-7">{resumeName}</div>
                  <div className="text-wrapper-8">{industry}</div>
                  <p className="p">
                    {barangay}, {city}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="div-wrapper">
            <div
              className="frame-5 hover-effect"
              onClick={() => setIsEditing(!isEditing)}
            >
              <img className="vector-7" alt="Vector" src={EditIcon} />
              <div className="text-wrapper-9">
                {isEditing ? "Cancel" : "Edit"}
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-3">
          <div className="text-wrapper-10">Personal Information</div>

          <div className="frame-6">
            <div className="text-wrapper-11">Name</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-12"
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-12">{resumeName}</div>
            )}
          </div>

          <div className="frame-7">
            <div className="text-wrapper-13">Experience</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-14"
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-14">{experience}</div>
            )}
          </div>

          <div className="frame-8">
            <div className="text-wrapper-15">Expected Salary</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-16"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-16">{salary}</div>
            )}
          </div>

          <div className="frame-9">
            <div className="text-wrapper-11">Industry</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-17"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-17">{industry}</div>
            )}
          </div>

          <div className="frame-10">
            <div className="text-wrapper-18">Email address</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-19"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-19">{email}</div>
            )}
          </div>

          <div className="frame-11">
            <div className="text-wrapper-11">Phone</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-20"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-20">{phone}</div>
            )}
          </div>

          <div className="frame-12">
            <div className="text-wrapper-11">Skills</div>
            {isEditing2 ? (
              <input
                className="text-wrapper-21"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-21">{skills}</div>
            )}
          </div>

          <div className="div-wrapper">
            <div
              className="frame-5 hover-effect"
              onClick={() => setIsEditing2(!isEditing2)}
            >
              <img className="vector-7" alt="Vector" src={EditIcon} />
              <div className="text-wrapper-9">
                {isEditing2 ? "Cancel" : "Edit"}
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-4">
          <div className="frame-13">
            <div
              className="frame-5 hover-effect"
              onClick={() => setIsEditing3(!isEditing3)}
            >
              <img className="vector-7" alt="Vector" src={EditIcon} />
              <div className="text-wrapper-9">
                {isEditing3 ? "Cancel" : "Edit"}
              </div>
            </div>
          </div>
          <div className="text-wrapper-22">Address</div>

          <div className="frame-14">
            <div className="text-wrapper-11">Country</div>
            {isEditing3 ? (
              <input
                className="text-wrapper-23"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-23">{country}</div>
            )}
          </div>

          <div className="frame-15">
            <div className="text-wrapper-11">Province</div>
            {isEditing3 ? (
              <input
                className="text-wrapper-24"
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-24">{province}</div>
            )}
          </div>

          <div className="frame-16">
            <div className="text-wrapper-11">Barangay</div>
            {isEditing3 ? (
              <input
                className="text-wrapper-24"
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-24">{barangay}</div>
            )}
          </div>

          <div className="frame-17">
            <div className="text-wrapper-11">City</div>
            {isEditing3 ? (
              <input
                className="text-wrapper-23"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-23">{city}</div>
            )}
          </div>

          <div className="frame-18">
            <div className="text-wrapper-25">Postal Code</div>
            {isEditing3 ? (
              <input
                className="text-wrapper-23"
                type="text"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            ) : (
              <div className="text-wrapper-23">{postal}</div>
            )}
          </div>
        </div>
        <Link to="/Settings">
          <div className="frame-19">
            <img className="vector-8" alt="Vector" src={Back} />
            <div className="text-wrapper-26">My Profile</div>
          </div>
        </Link>
        <button className="custom-button" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
