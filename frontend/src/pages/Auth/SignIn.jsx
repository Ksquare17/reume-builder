import React, { useState } from 'react';
import { app } from '../../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import { CircularProgress } from '@mui/material';
import { TextField, Button } from '@mui/material';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            valid = false;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            valid = false;
        }

        if (valid) {
            // Handle form submission
            console.log('Form Submitted', { email, password });
        }
    };
    const [loading, setLoading] = useState(false);

    const handleGoogle = async () => {
        try {
            dispatch(signInStart());
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            console.log(result?.user);
            const formData = {
                username: result?.user?.displayName,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };
            const response = await axios.post(`${BASE_URL}/auth/google-sign-in`, formData);
            console.log(response?.data?.user);
            dispatch(signInSuccess(response?.data?.user));
            toast.success(response?.data?.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);
            console.log(error);
            dispatch(signInFailure(error.message));
            toast.error("Login failed. Please try again.", {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleEmailPassword = async (e) => {
        e.preventDefault()
        
        try {
            dispatch(signInStart());
            setLoading(true);
            
            const auth = getAuth(app);
            const result = await createUserWithEmailAndPassword(auth,email, password);
            
            console.log(result?.user);
            const formData = {
                password: password,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };
            const response = await axios.post(`${BASE_URL}/auth/emailPassSignIn`, formData);
            console.log(response?.data?.user);
            dispatch(signInSuccess(response?.data?.user));
            
            toast.success(result?.data?.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);
            console.log(error);
            dispatch(signInFailure(error.message));
            toast.error("SignUp failed. Please try again.", {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }





    return (
        <div style={styles.container}>

            <button style={styles.button} onClick={handleGoogle} >
                {loading ? <CircularProgress size={28} /> :
                    <>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJKSURBVHgBvZTPaxNBFMffm93VpI2QQOqpyuhFBKFbUKmguIt6j9568z+Iihd/0YiCHgTTu2BzEKkIyUkvtRk9iUa7/gVdD2o9SFZaadP9Mc7uJtvNtlmtQr+w7OzbN595b+bNQxigtn58zEGvBIglAE4BMC/Mhhib3OWNvexDbat5mDQsamo+R+QpAboEKeIcTAUcrTC/8Hkg8JumUokoTUSg8JfquDA+yt4bvW85HtlWMARucUBTDC3x+GmrsTAro6xlxP0j4DCRHm6KTExY9nLTBxizNrKYoLLk1sW/xsh86zYkFKS8+hKozehipzWysZKHaqH57hNsUySYvEsuZ899gczJpSiyf4EFrBCAwb5kTi2BvH8F1p4cnkk66vfXx8Bz82mw5vXs6yBle05ud+vMpzPlrKMnnc/cXWlyBC0NCHyYknCEqStvR10gt2K2/4L3Ioxq6aNdVNXHpU1QF+Ey8bgef5ADi/t4jvUzPBTkTByMNrt6EKq/joA8xMvC2ldj7Eaur4C1e22KnkJ7V028DVYpWEGEDpFrd5bVABaIY+XYs/OnIU2uUhYQGn1zqRqlnNXXzBfr+6pxf+4RdnT2wlSS42/HiUcP6gQh1jzQfHUzW+tG2nWsl/JKR1rg0H/9RKlYYq966UZ3mdhFGPp6DYhTBH8/527tYX1AXxNPS9RFqZmEDpIPzXy/cvHN1UNRbyRxh7eTDdPe7Y6LVWb+BBNdyPTkH3ocFtoHKIyWlEXrUoWXChzyInJTdCQDPJxuTT5nsBP6DUkW1QHQYUIiAAAAAElFTkSuQmCC" alt="Google Logo" style={styles.icon} />
                        <p style={styles.text}>Continue With Google</p>

                    </>
                }
            </button>
{/* 
            <form noValidate onSubmit={handleEmailPassword}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmailChange}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
            </form> */}


        </div>
    );
}

const styles = {
    container: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        // overflow: 'hidden',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 21px',
        borderRadius: '5px',

        border: 'black 2px solid',
        backgroundColor: '#fff',
        color: '#fff',
        cursor: 'pointer',
        width: '320px',
        zIndex: 1,
    },
    text: {
        fontSize: '18px',
        fontWeight: '700',
        margin: '0',
        color: '#000',
    },
    icon: {
        marginRight: '10px',
        width: '24px',
        height: '24px',
    },
};
