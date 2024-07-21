import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import nits from '../../assests/nitSilchar.jpeg';
import Header from '../Header';
import Footer from '../Footer';

function AddStudents() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [dname, setdName] = useState('');


    useEffect(() => {
        axios.get('/api')
          .then(res => {
            if (res.data.Status === "Success") {
              setAuth(true);                 
              setdName(res.data.displayname);
            } else {
              setAuth(false);              
              navigate('/login');
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
      }, [navigate]);



    const [values, setValues] = useState({
        name: '',
        scholarId: '',
        uname: '',
        password: '',
        cpassword: '',
        phone: '',
        email: '',
        dept: '',
        gender: '',
        role: 'user'
    });



    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.password !== values.cpassword) {
            alert("Passwords do not match.");
            return;
        }



        axios.post('/api/addStudents', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert(res.data.Message);
                    window.location.reload();

                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred while adding students.");
            });
    };

    const containerStyle = {
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${nits})`,
        backgroundSize: 'cover',      
    };

    const formContainerStyle = {
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    };

    const formGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem'
    };

    const labelStyle = {
        width: '25%',
        marginRight: '10px'
    };

    const inputStyle = {
        flex: 1,
        borderRadius: '5px',
        border: '1px solid #ccc',
        padding: '8px'
    };

    return (
        <>
         <Header displayName={dname}/>
        <div style={containerStyle}>
         
            <div className="row justify-content-center w-100">
                <div className="col-lg-8 col-md-10">
                    <div style={formContainerStyle}>
                        <form onSubmit={handleSubmit}>
                            {[
                                { label: 'Full Name', name: 'name', type: 'text' },
                                { label: 'Scholar Id', name: 'scholarId', type: 'number' },
                                { label: 'Username', name: 'uname', type: 'text' },
                                { label: 'Create Password', name: 'password', type: 'password' },
                                { label: 'Confirm Password', name: 'cpassword', type: 'password' },
                                { label: 'Phone number', name: 'phone', type: 'number' },
                                { label: 'Email', name: 'email', type: 'email' },
                                { label: 'Department', name: 'dept', type: 'text' }
                            ].map(({ label, name, type }) => (
                                <div className="form-group" key={name} style={formGroupStyle}>
                                    <label htmlFor={name} style={labelStyle}><strong>{label}</strong></label>
                                    <input
                                        type={type}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        name={name}
                                        id={name}
                                        value={values[name]}
                                        onChange={e => setValues({ ...values, [name]: e.target.value })}
                                        style={inputStyle}
                                        className="form-control"
                                    />
                                </div>
                            ))}
                            <div className="form-group mb-3" style={formGroupStyle}>
                                <label htmlFor="gender" style={labelStyle}><strong>Gender</strong></label>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={values.gender}
                                    onChange={e => setValues({ ...values, gender: e.target.value })}
                                    style={inputStyle}
                                    className="form-control"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group mb-3" style={formGroupStyle}>
                                <label htmlFor="role" style={labelStyle}><strong>Role</strong></label>
                                <select
                                    name="role"
                                    id="role"
                                    value={values.role}
                                    onChange={e => setValues({ ...values, role: e.target.value })}
                                    style={inputStyle}
                                    className="form-control"
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="submit" className="btn btn-primary btn-block rounded-5" style={{ width: '500px' }}>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default AddStudents;
