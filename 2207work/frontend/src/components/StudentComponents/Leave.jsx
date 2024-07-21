import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import nits from '../../assests/nitSilchar.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Leave() {


    const [auth, setAuth] = useState(false);
    const [dname, setdName] = useState('');
    const [scid, setScid] = useState('');
    const [nod, setNod] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api')
            .then(res => {
                if (res.data.Status === "Success") {
                    setdName(res.data.displayname);
                    setScid(res.data.scholarId);
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [navigate]);



    // const { name } = useParams();
    const [values, setValues] = useState({
        leaveFrom: '',
        leaveTo: '',
        reasonLeave: '',
        nod: '',
        scid: ''
    });







    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        const date1 = new Date(values.leaveFrom);
        const date2 = new Date(values.leaveTo);
        const diffInMilliseconds = date2 - date1;
        let daysBetween = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        values.nod = daysBetween;
        values.scid = scid;
        console.log(values);

        axios.post('/api/addleave', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    // console.log(res.data)

                    alert(res.data.Message);
                    window.location.reload();

                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred ");
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
                <Header displayName={dname} />
                {/* <h1>Hello, {name}! </h1> */}

                <div style={backgroundStyle}>
                    <div style={blurOverlay}></div>
                    <div className="container" style={containerStyle}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mb-4">
                                    <h1 style={headlineStyle}>Leave Form</h1>
                                </div>
                                <div className="bg-white p-3 rounded border">
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label htmlFor='leaveFrom'><strong>Leave From</strong></label>
                                            <input type='date' name='leaveFrom' autoComplete='off'
                                                onChange={e => setValues({ ...values, leaveFrom: e.target.value })} className='form-control rounded-3' />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='leaveTo'><strong>Leave To</strong></label>
                                            <input type='date' name='leave' min={values.leaveFrom} autoComplete='off'
                                                onChange={e => setValues({ ...values, leaveTo: e.target.value })} className='form-control rounded-3' />
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="leaveReason"><strong>Reason of leave</strong></label>
                                            <textarea type="text" rows="10" placeholder='Reasoon of leave' name='rleave' style={{ resize: 'none' }}
                                                onChange={e => setValues({ ...values, reasonLeave: e.target.value })} className='form-control rounded-3' />
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
            <Footer />
        </>

    );
}

export default Leave;






