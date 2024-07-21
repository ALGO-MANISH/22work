
import nits from '../../assests/nitSilchar.jpeg';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../Header';
import Footer from '../Footer';

function ApproveLeave() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [dname, setdName] = useState('');
    const [leaveApplications, setLeaveApplications] = useState([]);

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

        axios.get('/api/leaveApplication')
            .then(res => {
                if (res.data.Status === "Success") {
                    setLeaveApplications(res.data.dataArray);
                } else {
                    setAuth(false);
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [navigate]);

    return (
        <>
            <Header displayName={dname} />
            <div className="container">
                <h1>List of Student Leave</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Applied Date</th>
                            <th>Scholar ID</th>
                            <th>Name</th>
                            <th>Hostel Name</th>
                            <th>Room No</th>
                            <th>Leave From</th>
                            <th>Leave To</th>
                            <th>Total Days</th>
                            <th>Reason of Leave</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {leaveApplications.map(application => (
                            <tr key={application.sl}>
                                <td>{application.sl}</td>
                                <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                                <td>{application.scholarid}</td>
                                <td>{application.name}</td>
                                <td>{application.hostel_name}</td>
                                <td>{application.room_no}</td>
                                <td>{new Date(application.leave_from).toLocaleDateString()}</td>
                                <td>{new Date(application.leave_to).toLocaleDateString()}</td>
                                <td>{application.total_day}</td>
                                <td>{application.reason_of_leave}</td>
                                <td><button>approve</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default ApproveLeave;
