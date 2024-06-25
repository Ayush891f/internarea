import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Register from './Componets/auth/Register';
import Intern from './Componets/Internships/Intern';
import JobAvl from './Componets/Job/JobAvl';
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from './Componets/Internships/InternDeatil';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from './Admin/ViewAllApplication';
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from './Applications/DeatilApplicationUser';
import { login, logout, selectUser } from './Feature/Userslice';
import { auth } from './firebase/firebase';
import{ useLocation } from 'react-router-dom';
import './App.css';
import './i18n';
import { UserAuthContextProvider } from './firebase/UserAuthContext';
import LoginHistory from './LoginHistory';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const { t, i18n } = useTranslation();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [loginId, setLoginId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const currentLocation = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      applyLanguageAndBackground(savedLanguage);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { userId, email });
      setMessage(response.data.message);
      setLoginId(response.data.loginId);
      if (response.data.loginId) {
        setShowOtpInput(true);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verifyotp', { loginId, otp });
      setMessage(response.data.message);
      if (response.data.message === 'OTP verified successfully') {
        setShowHistory(true);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const requestOtp = async (lng) => {
    setOtpSent(false);
    setOtp('');
    setIdentifier('');
    setSelectedLanguage(lng);

    switch (lng) {
      case 'hi':
      case 'zh':
      case 'fr':
        setVerificationMethod(lng === 'fr' ? 'email' : 'mobile');
        const isOtpSent = await (lng === 'fr' ? sendOtpEmail() : sendOtpMobile());
        if (isOtpSent) {
          setOtpSent(true);
        } else {
          alert('Failed to send OTP. Please try again.');
        }
        break;
      default:
        setVerificationMethod('mobile');
        const isOtpSentDefault = await sendOtpMobile();
        if (isOtpSentDefault) {
          setOtpSent(true);
        } else {
          alert('Failed to send OTP. Please try again.');
        }
        break;
    }
  };

  const sendOtpEmail = async () => {
    const email = prompt(t('emailPrompt'));
    if (!email) return false;

    setIdentifier(email);
    try {
      const response = await axios.post('/api/send-otp-email', { email });
      return response.data.success;
    } catch (error) {
      console.error('Error sending OTP to email:', error);
      return false;
    }
  };

  const sendOtpMobile = async () => {
    const mobile = prompt(t('mobilePrompt'));
    if (!mobile) return false;

    setIdentifier(mobile);
    try {
      const response = await axios.post('/api/send-otp-mobile', { mobile });
      return response.data.success;
    } catch (error) {
      console.error('Error sending OTP to mobile:', error);
      return false;
    }
  };

  const verifyOtp = async () => {
    try {
      console.log('Frontend - identifier:', identifier);
        console.log('Frontend - otp:', otp);
      const response = await axios.post('/api/verify-otp', { identifier, otp });
      if (response.data.success) {
        alert('OTP verified successfully.');
        applyLanguageAndBackground(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
        setOtpSent(false);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP.');
    }
  };
     

  const applyLanguageAndBackground = (lng) => {
    i18n.changeLanguage(lng);
    const body = document.body;
    body.classList.remove('bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-white');

    switch (lng) {
      case 'hi':
        body.classList.add('bg-blue-500');
        break;
      case 'zh':
        body.classList.add('bg-green-500');
        break;
      case 'fr':
        body.classList.add('bg-yellow-500');
        break;
      default:
        body.classList.add('bg-white');
        break;
    }
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          name: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <UserAuthContextProvider/>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
        <p className="mb-4">{t('description')}</p>
        {currentLocation.pathname === '/' && (
          <div className="flex flex-row py-4 space-x-4  items-center ">
            <button
              onClick={() => requestOtp('en')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              English
            </button>
            <button
              onClick={() => requestOtp('es')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Spanish
            </button>
            <button
              onClick={() => requestOtp('hi')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Hindi
            </button>
            <button
              onClick={() => requestOtp('pt')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Portuguese
            </button>
            <button
              onClick={() => requestOtp('zh')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Chinese
            </button>
            <button
              onClick={() => requestOtp('fr')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              French
            </button>
          </div>
        )}
        {otpSent && currentLocation.pathname === '/' && (
          <div className="flex flex-col items-center">
            <p>{t('otpPrompt')}</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 mb-4"
            />
            <button
              onClick={verifyOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t('verifyOtp')}
            </button>
          </div>
        )}
      </div>

      {currentLocation.pathname === '/' && (
        <div className="flex flex-col items-center bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4">{t('Login')}</h1>
          <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {showOtpInput && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpVerify}>Verify OTP</button>
        </div>
      )}
      <p>{message}</p>
      {showHistory && <LoginHistory userId={userId} />}
      
  </div>
)}

    
<Routes>
  <Route path='/' element={<Home/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/internship' element={<Intern/>}/>
<Route path='/Jobs' element={<JobAvl/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/detailjob' element={<JobDetail/>}/>
<Route path='/detailInternship' element={<InternDeatil/>}/>
<Route path='/detailApplication' element={<DeatilApplication/>}/>
<Route path='/adminLogin' element={<AdminLogin/>}/>
<Route path='/adminepanel' element={<Adminpanel/>}/>
<Route path='/postInternship' element={<Postinternships/>}/>
<Route path='/applications' element={<ViewAllApplication/>}/>
<Route path='/UserapplicationDetail' element={< UserapplicationDetail/>}/>
<Route path='/userapplication' element={<UserApplicatiom/>}/>
</Routes>
<Footer/>
    </div>
  );
}

export default App;
