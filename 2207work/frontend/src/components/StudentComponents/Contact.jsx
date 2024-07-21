import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';


export default function Contact() {


    const [dname, setdName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api')
          .then(res => {
            if (res.data.Status === "Success") {                           
              setdName(res.data.displayname);
            } else {                          
              navigate('/login');
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
      }, [navigate]);



    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();      
        console.log(formData);        
        setFormData({ name: '', email: '', message: '' });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'linear-gradient(to bottom right, #4CAF50, #2196F3)',
            color: 'white',
        },
        form: {
            width: '100%',
            maxWidth: '500px',
            marginTop: '20px',
        },
        inputGroup: {
            marginBottom: '15px',
            textAlign: 'left',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            resize: 'vertical',
            minHeight: '100px',
        },
        submitButton: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        submitButtonHover: {
            backgroundColor: '#2196F3',
        },
    };

    return (
    <>
     <Header displayName={dname}/>
        <div style={styles.container}>
            <h1>Contact Us</h1>
            <p>For any inquiries or assistance, please reach out to us using the form below:</p>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#2196F3')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                >
                    Submit
                </button>
            </form>
        </div>
        <Footer />
        </>
    );
}
