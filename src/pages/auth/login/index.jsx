import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doPasswordReset } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const maxLoginAttempts = 3;

    const handleAuthError = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                setErrorMessage('No account found with this email address.');
                break;
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setErrorMessage('Incorrect email or password. Please try again.');
                break;
            case 'auth/too-many-requests':
                setErrorMessage('Too many login attempts. Please try again later.');
                break;
            case 'auth/invalid-email':
                setErrorMessage('Invalid email address format.');
                break;
            case 'auth/network-request-failed':
                setErrorMessage('Network error. Please check your connection.');
                break;
            default:
                setErrorMessage('An error occurred. Please try again later.');
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error
    
        if (isLockedOut) {
            setErrorMessage('Your account is temporarily locked due to multiple failed login attempts. Please try again later.');
            return;
        }
    
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                console.log('Full error:', error);  // Log the full error object for debugging
                handleAuthError(error);
                setIsSigningIn(false);
                setLoginAttempts((prevAttempts) => {
                    const newAttempts = prevAttempts + 1;
                    if (newAttempts >= maxLoginAttempts) {
                        setIsLockedOut(true);
                    }
                    return newAttempts;
                });
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                console.error('Full Error:', error); // Log for debugging
                handleAuthError(error);
                setIsSigningIn(false);
            }
        }
    };

    const onResetPassword = async () => {
        if (!email) {
            setErrorMessage('Please enter your email address to reset your password.');
            return;
        }
        try {
            await doPasswordReset(email);
            alert('Password reset email sent! Please check your email inbox.');
        } catch (error) {
            handleAuthError(error);
        }
    };

    if (userLoggedIn) {
        const uid = currentUser?.uid;
        if (uid === 'fj20QT1j1LWl3bBNBfqoHxPOaH13') {
            return <Navigate to="/HRDashboard" />;
        } else {
            return <Navigate to="/ApplicantDashboard" state={{ userId: uid }} />;
        }
    }

    return (
        <div style={{ backgroundColor: '#0073BD', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <main style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF200', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ color: '#0073BD', fontSize: '1.5rem', fontWeight: '600' }}>Welcome Back</h3>
                </div>
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#FFF', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete='current-password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#FFF', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />

                    {errorMessage && (
                        <span style={{ color: '#FCB20B', fontSize: '0.9rem' }}>{errorMessage}</span>
                    )}

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#0073BD', color: '#FFF', cursor: isSigningIn ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#0073BD' }}>
                    <Link to={'/register'} style={{ color: '#0073BD', fontWeight: '600', textDecoration: 'none' }}>Don't have an account? Sign up</Link>
                    <br />
                    <button onClick={onResetPassword} style={{ border: 'none', background: 'none', color: '#0073BD', cursor: 'pointer', fontWeight: '600' }}>Forgot Password?</button>
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <div style={{ flex: '1', borderBottom: '1px solid #0073BD' }}></div>
                    <div style={{ margin: '0 10px', fontSize: '0.8rem', fontWeight: '600', color: '#0073BD' }}>OR</div>
                    <div style={{ flex: '1', borderBottom: '1px solid #0073BD' }}></div>
                </div>
                <button
                    disabled={isSigningIn}
                    onClick={onGoogleSignIn}
                    style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#FFF', cursor: isSigningIn ? 'not-allowed' : 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                >
                    <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Google icon SVG */}
                    </svg>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </main>
        </div>
    );
};

export default Login;
