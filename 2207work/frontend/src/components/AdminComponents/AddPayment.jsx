import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import nits from '../../assests/nitSilchar.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function AddPayment() {   


    const [auth, setAuth] = useState(false);
    const [dname, setdName] = useState('');
    const navigate = useNavigate();

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


    
    // const { name } = useParams();
    const [values, setValues] = useState({
        scholarId: '',
        paid: '',
        leave:'',
        joining:'',
        hostetName:'',
        roomNo:''
    });


    

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/addpayments', values)
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

    const backgroundStyle = {
        backgroundImage: `url(${nits})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '93vh',
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
      <div>
        <Header displayName={dname}/>
        {/* <h1>Hello, {name}! </h1> */}
 
        <div style={backgroundStyle}>
                <div style={blurOverlay}></div>
                <div className="container" style={containerStyle}>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center mb-4">
                                <h1 style={headlineStyle}>Add Payment Details</h1>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor='scholarId'><strong>Scholar Id :</strong></label>
                                        <input type='number' placeholder='Scholar Id' name='scholarId' autoComplete='off'
                                            onChange={e => setValues({ ...values, scholarId: e.target.value })} className='form-control rounded-3' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='paid'><strong>Paid Amount :</strong></label>
                                        <input type='number' placeholder='Paid Amount' name='paid' autoComplete='off'
                                            onChange={e => setValues({ ...values, paid: e.target.value })} className='form-control rounded-3' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='leave'><strong>Number of days leave:</strong></label>
                                        <input type='number' placeholder='leave days' name='leave' autoComplete='off'
                                            onChange={e => setValues({ ...values, leave: e.target.value })} className='form-control rounded-3' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="joiningDate"><strong>Joining Date</strong></label>
                                        <input type="date"  name='joining'
                                            onChange={e => setValues({ ...values, joining: e.target.value })} className='form-control rounded-3' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="hostelName"><strong>Hostel Name</strong></label>
                                        <input type="text" placeholder='Hostel Name' name='hostelName'
                                            onChange={e => setValues({ ...values, hostetName: e.target.value })} className='form-control rounded-3' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="roomNo"><strong>Room no</strong></label>
                                        <input type="text" placeholder='Room no (eg : S213)' name='roomNo'
                                            onChange={e => setValues({ ...values, roomNo: e.target.value })} className='form-control rounded-3' />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button type="submit" className="btn btn-primary btn-block rounded-5" style={{ width: '300px' }}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
      </div>
       <Footer/>
       </>
      
    );
  }

export default AddPayment;






