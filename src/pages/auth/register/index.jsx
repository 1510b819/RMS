import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from '../../../firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleError = (error) => {
        console.error(error);
        switch (error.code) {
            case 'auth/email-already-in-use':
                setErrorMessage('This email is already in use. Please use a different email.');
                break;
            case 'auth/invalid-email':
                setErrorMessage('Invalid email format. Please check your email and try again.');
                break;
            case 'auth/weak-password':
                setErrorMessage('Password should be at least 6 characters.');
                break;
            default:
                setErrorMessage('An error occurred. Please try again later.');
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (!passwordValid || !passwordsMatch || !termsAccepted) { // Check if terms are accepted
                setErrorMessage('Please ensure all form fields are valid and terms are accepted.');
                setIsRegistering(false);
                return;
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                await doSendEmailVerification();
                navigate('/verification');
            } catch (error) {
                handleError(error);
                setIsRegistering(false);
            }
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    return (
        <>
            {userLoggedIn ? (
                <Navigate to="/verification" />
            ) : (
                <main style={{ backgroundColor: '#0073BD', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#FFF200', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h3 style={{ color: '#0073BD', fontSize: '1.5rem', fontWeight: '600' }}>Create a New Account</h3>
                        </div>
                        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#FFF', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                            />
                            <input
                                type="password"
                                autoComplete='new-password'
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    const isValid = validatePassword(e.target.value);
                                    setPasswordValid(isValid);
                                }}
                                style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: passwordValid ? '#FFF' : '#FFCCCC', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                            />
                            {!passwordValid && (
                                <span style={{ color: '#FF0000', fontSize: '0.9rem' }}>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.</span>
                            )}
                            <input
                                type="password"
                                autoComplete='off'
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setPasswordsMatch(e.target.value === password);
                                }}
                                disabled={!passwordValid}
                                style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: passwordsMatch ? '#FFF' : '#FFCCCC', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                            />
                            {!passwordsMatch && (
                                <span style={{ color: '#FF0000', fontSize: '0.9rem' }}>Passwords do not match.</span>
                            )}
                            {errorMessage && (
                                <span style={{ color: '#FCB20B', fontSize: '0.9rem' }}>{errorMessage}</span>
                            )}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)} // Update state on checkbox change
                                />
                                I accept the <Link to="/terms" style={{ color: '#0073BD', textDecoration: 'underline' }}>Terms and Conditions</Link>
                            </label>
                            <button
                                type="submit"
                                disabled={isRegistering || !passwordValid || !passwordsMatch || !termsAccepted}
                                style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: isRegistering || !passwordValid || !passwordsMatch || !termsAccepted ? '#BFBFBF' : '#0073BD', color: '#FFF', cursor: isRegistering ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                            >
                                {isRegistering ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <span style={{ color: '#0073BD', fontSize: '0.9rem' }}>Already have an account? </span>
                            <Link to={'/login'} style={{ color: '#0073BD', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default Register;
