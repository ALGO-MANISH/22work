import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import nits from './assests/nitSilchar.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => console.log(err));
    };

    const backgroundStyle = {
        backgroundImage: `url(${nits})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    };

    const blurOverlay = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)', // Blurs the background image
        zIndex: 1,
    };

    const containerStyle = {
        zIndex: 2, // Ensures the content is above the blur overlay
        position: 'relative',
    };

    const headlineStyle = {
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    };

    return (
        <>
            <div style={backgroundStyle}>
                <div style={blurOverlay}></div>
                <div className="container" style={containerStyle}>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center mb-4">
                                <h1 style={headlineStyle}>MESS MANAGEMENT LOGIN</h1>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor='email'><strong>Username</strong></label>
                                        <input type='text' placeholder='Enter username' name='email' autoComplete='off'
                                            onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-3' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password"><strong>Password</strong></label>
                                        <input type="password" placeholder='Enter Password' name='password'
                                            onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-3' />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block rounded-5" style={{ width: '100px' }}>Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
