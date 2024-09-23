import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Candidate from "pages/Candidates";
import JobPosting from "pages/JobPosting";
import Resume from "pages/Resume";
import Login from "pages/auth/login";
import Register from "pages/auth/register";
import Terms from "pages/Terms";
import DB from "pages/DB";
import ApplicantDashboard from "pages/ApplicantDashboard";
import VerificationPage from "pages/auth/VerificationPage";
import { AuthProvider, useAuth } from "./contexts/authContext";
import GuestDashboard from "pages/GuestDashboard";
import Logout from "pages/logout";
import PrivacyNotice from "pages/PrivacyNotice";
import Status from "pages/Status";
import HRDashboard from "pages/HRDashboard";
import UploadFile from "pages/UploadFile";
import Settings from "pages/Settings";
import MyProfile from "pages/MyProfile";
import Security from "pages/Security";
import JobSelected  from "pages/JobSelected";
import MainPage from "pages/MainPage";

// PrivateRoute component handles route protection
const PrivateRoute = ({ element, adminOnly }) => {
  const { userLoggedIn, currentUser } = useAuth();

  if (adminOnly) {
    if (userLoggedIn && currentUser && currentUser.email === 'admin@gmail.com') {
      return element;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (!userLoggedIn && element.props.path !== "/" && element.props.path !== "/login" && element.props.path !== "/register") {
    return <Navigate to="/login" />;
  }

  if (userLoggedIn && currentUser && !currentUser.emailVerified && element.props.path !== '/verification') {
    return <Navigate to="/verification" />;
  }

  return element;
};

const ProjectRoutes = () => {
  const routesArray = [
    { path: "/", element: <Main /> },
    { path: "/main", element: <MainPage /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/candidate",
      element: <PrivateRoute element={<Candidate />} adminOnly />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/Security",
      element: <Security />,
    },
    {
      path: "/guest",
      element: <GuestDashboard />,
    },
    {
      path: "/UploadFile",
      element: <UploadFile />,
    },
    {
      path: "/jobposting",
      element: <PrivateRoute element={<JobPosting />} adminOnly />,
    },
    {
      path: "/JobSelected",
      element: <JobSelected />,
    },
    {
      path: "/terms",
      element: <Terms />,
    },
    {
      path: "/Settings",
      element: <Settings />,
    },
    {
      path: "/privacy-notice",
      element: <PrivacyNotice />,
    },
    {
      path: "/MyProfile",
      element: <MyProfile />,
    },
    {
      path: "/Status",
      element: <PrivateRoute element={<Status />} adminOnly />,
    },
    {
      path: "/HRDashboard",
      element: <PrivateRoute element={<HRDashboard />} adminOnly />,
    },
    {
      path: "/applicantdashboard",
      element: <PrivateRoute element={<ApplicantDashboard />} />,
    },
    {
      path: "/db",
      element: <PrivateRoute element={<DB />} adminOnly />,
    },
    {
      path: "/resume",
      element: <PrivateRoute element={<Resume />} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verification",
      element: <VerificationPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">
        {routesElement}
      </div>
    </AuthProvider>
  );
};

export default ProjectRoutes;
