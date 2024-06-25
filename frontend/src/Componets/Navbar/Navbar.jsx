import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import "./navbar.css";
import Sidebar from './Sidebar';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../Feature/Userslice';
import axios from 'axios';
function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [isDivVisibleForIntern, setDivVisibleForIntern] = useState(false);
    const [isDivVisibleForJob, setDivVisibleForJob] = useState(false);
    const [isDivVisibleForLogin, setDivVisibleForLogin] = useState(false);
    const [isDivVisibleForProfile, setDivVisibleForProfile] = useState(false);
    const [isStudent, setStudent] = useState(true);
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    const loginFunction = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        setDivVisibleForLogin(false);
    };

    const logoutFunction = () => {
        signOut(auth);
        navigate("/");
    };
     
    

    const toggleInternDropdown = () => {
        setDivVisibleForIntern(!isDivVisibleForIntern);
        setDivVisibleForJob(false);
    };

    const toggleJobDropdown = () => {
        setDivVisibleForJob(!isDivVisibleForJob);
        setDivVisibleForIntern(false);
    };
    const { t, i18n } = useTranslation();

    const getUserDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        const browser = (() => {
          if (userAgent.includes('Chrome')) return 'Chrome';
          if (userAgent.includes('Firefox')) return 'Firefox';
          if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';
          if (userAgent.includes('Safari')) return 'Safari';
          return 'Unknown';
        })();
        const os = (() => {
          if (userAgent.includes('Win')) return 'Windows';
          if (userAgent.includes('Mac')) return 'MacOS';
          if (userAgent.includes('Linux')) return 'Linux';
          if (userAgent.includes('Android')) return 'Android';
          if (userAgent.includes('iOS')) return 'iOS';
          return 'Unknown';
        })();
        const device = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
        return { browser, os, device };
      };
    
      const handleLogin = async () => {
        const { browser, os, device } = getUserDeviceInfo();
    
        try {
          const ipRes = await axios.get('https://api.ipify.org?format=json');
          const ipAddress = ipRes.data.ip;
          const response = await axios.post('/api/login', { userId, email, browser, os, device, ipAddress });
          setMessage(response.data.message);
    
          if (browser === 'Chrome') {
            requestOtp(email);
          } else if (browser === 'Internet Explorer') {
            completeLogin(response.data.user);
          } else if (device === 'Mobile') {
            const currentHour = new Date().getHours();
            if (currentHour >= 10 && currentHour <= 13) {
              completeLogin(response.data.user);
            } else {
              alert('Mobile access is allowed only from 10 AM to 1 PM.');
            }
          } else {
            completeLogin(response.data.user);
          }
        } catch (error) {
          setMessage(error.response.data.error);
        }
      };
    
      const requestOtp = async (email) => {
        try {
          const response = await axios.post('/api/send-otp-email', { email });
          if (response.data.success) {
            setOtpSent(true);
            setIdentifier(email);
          } else {
            alert('Failed to send OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
      };
    
      const verifyOtp = async () => {
        try {
          const response = await axios.post('/api/verify-otp', { identifier, otp });
          if (response.data.success) {
            completeLogin(response.data.user);
          } else {
            alert('Invalid OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
          alert('An error occurred while verifying OTP.');
        }
      };
    
      const completeLogin = (user) => {
        dispatch(login(user));
        setMessage('Login successful');
      };
    
      const handleLogout = () => {
        dispatch(logout());
        setMessage('Logged out');
      };

    return (
        <div>
            <nav className='nav1'>
                <ul>
                    <div className="img">
                        <Link to={"/"}><img src={logo} alt="Logo" /></Link>
                    </div>
                    <div className="elem">
                        <p id='int' onClick={toggleInternDropdown}> {t('Internships')} <i id='ico' className="bi bi-caret-down-fill"></i></p>
                        <p onClick={toggleJobDropdown}>{t('Jobs')} <i id='ico2' className="bi bi-caret-down-fill"></i></p>
                    </div>
                    <div className="search">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder='Search' />
                    </div>
                    {
                        user ? (
                            <>
                                <div className='Profile'>
                                    <Link to={"/profile"}>
                                        <img src={user?.photo} alt="" onMouseEnter={() => setDivVisibleForProfile(true)} className='rounded-full w-12' id='picpro' />
                                        <i className='bi bi-caret-up-fill' id='ico3' onClick={() => setDivVisibleForProfile(false)}></i>
                                    </Link>
                                </div>
                                <button className='bt-log' id='bt' onClick={logoutFunction}>Logout <i className="bi bi-box-arrow-right"></i></button>
                            </>
                        ) : (
                            <>
                                <div className="auth">
                                    <button className='btn1' onClick={() => setDivVisibleForLogin(true)}>{t('Login')}</button>
                                    <button className='btn2'><Link to="/register">{t('Register')}</Link></button>
                                </div>
                                
                                <div className="admin">
                                    <Link to={"/adminLogin"}>
                                        <button>{t('Admin')}</button>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </ul>
            </nav>

            {
                isDivVisibleForIntern && (
                    <div className="profile-dropdown-2">
                        <div className="left-section">
                            <p>Top Locations</p>
                            <p>Profile</p>
                            <p>Top Category</p>
                            <p>Explore More Internships</p>
                        </div>
                        <div className="line flex bg-slate-400"></div>
                        <div className="right-section">
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                        </div>
                    </div>
                )
            }
            {
                isDivVisibleForJob && (
                    <div className="profile-dropdown-1">
                        <div className="left-section">
                            <p>Top Locations</p>
                            <p>Profile</p>
                            <p>Top Category</p>
                            <p>Explore More Internships</p>
                        </div>
                        <div className="line flex bg-slate-400"></div>
                        <div className="right-section">
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                        </div>
                    </div>
                )
            }
            <div className="login">
                {
                    isDivVisibleForLogin && (
                        <>
                            <button id='cross' onClick={() => setDivVisibleForLogin(false)}><i className="bi bi-x"></i></button>
                            <h5 id='state' className='mb-4 justify-center text-center'>
                                <span id='Sign-in' style={{ cursor: "pointer" }} className={`auth-tab ${isStudent ? 'active' : ""}`} onClick={() => setStudent(true)}>
                                    {t('Student')}
                                </span>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <span id='join-in' style={{ cursor: "pointer" }} className={`auth-tab ${isStudent ? 'active' : ""}`} onClick={() => setStudent(false)}>
                                    {t('Employee and T&P')}
                                </span>
                            </h5> 
                            {isStudent ? (
                                <div className="py-6">
                                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                                        <div className="w-full p-8 lg:w-1/2">
                                            <p onClick={loginFunction} className='flex items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100'>
                                                <div className="px-4 py-3">
                                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.64 25.575 27.1759 27.4659 25.2333 28.7483L25.2592 28.9217L30.5975 33.125C29.9658 33.6867 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                                    </svg>
                                                </div>
                                                <h1 id='go' className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">{t('Sign in with Google')}</h1>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-6">
                                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                                        <div className="w-full p-8 lg:w-1/2">
                                            <p onClick={loginFunction} className='flex items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100'>
                                                <div className="px-4 py-3">
                                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.64 25.575 27.1759 27.4659 25.2333 28.7483L25.2592 28.9217L30.5975 33.125C29.9658 33.6867 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                                    </svg>
                                                </div>
                                                <h1 id='go' className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">{t('Sign in with Google')}</h1>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
            <Sidebar />
        </div>
    )
}

export default Navbar
