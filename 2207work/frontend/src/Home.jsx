import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landingpage from './components/Landingpage'


function Home() {
  const [auth, setAuth] = useState(false);
  const [mEmail, setMEmail] = useState('');
  const [dname, setdName] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setMEmail(res.data.email);
          setRole(res.data.role);          
          setdName(res.data.displayname);
        } else {
          setAuth(false);
          setMessage(res.data.Message);         
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [navigate]);



  return (
    <div>
      {auth ? (
        <div>
          <Header displayName={dname} />
           <Landingpage email={mEmail} role={role} displayName={dname}/> 
          <Footer />
        </div>
      ) : (
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
          <h2 style={{ marginTop: "10vh" }}> {message}</h2>        
        </div>
      )}
    </div>
  );
}

export default Home;
