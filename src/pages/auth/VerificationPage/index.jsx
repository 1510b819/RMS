import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";

const VerificationPage = () => {
    const { userLoggedIn, currentUser, deleteUserAccount } = useAuth();
    const [verificationTimer, setVerificationTimer] = useState(30); // 30 seconds
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false); // State to manage redirection

    useEffect(() => {
        const timer = setInterval(() => {
            setVerificationTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAccountDeletion(); // Call the function to handle account deletion
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentUser]);

    const handleAccountDeletion = async () => {
        try {
            await deleteUserAccount(); // Call the deleteUserAccount function
            setErrorMessage('Your verification time has expired. Your account has been deleted. Please register again.');
            // Set a timeout to redirect after 5 seconds
            setTimeout(() => {
                setRedirect(true);
            }, 5000);
        } catch (error) {
            console.error("Error deleting account:", error);
            setErrorMessage('An error occurred while deleting your account. Please try again.');
        }
    };

    // Check if redirection is needed
    if (redirect) {
        return <Navigate to="/" />;
    }

    // Check if the user is logged in and if the email is verified
    if (userLoggedIn && currentUser && currentUser.emailVerified) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ backgroundColor: '#0073BD', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF200', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ textAlign: 'center', color: '#0073BD', fontSize: '1.5rem', fontWeight: '600' }}>Please Verify Your Email</h3>
                <p style={{ textAlign: 'center', marginBottom: '20px', color: '#0073BD' }}>
                    We've sent you an email with a verification link. Please verify your email address to continue.
                </p>
                {errorMessage && (
                    <span style={{ color: '#FF0000', fontSize: '0.9rem' }}>{errorMessage}</span>
                )}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={{ color: '#0073BD', fontSize: '0.9rem' }}>
                        Verification expires in {verificationTimer} seconds
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
