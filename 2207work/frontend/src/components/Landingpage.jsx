import React, { useState, useEffect } from 'react';
import profilepic from '../assests/profile1.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assests/hostel.jpg'
import { Link, NavLink } from 'react-router-dom';


export default function Landingpage(props) {


  const [schId, setSchId] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [strdate, setStrdate] = useState('');
  const [amtpaid, setAmtpaid] = useState('');
  const [leavetaken, setLeavetaken] = useState('');

  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');


  const [price, setPrice] = useState('');

  const [totalamount, setTotalamount] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('/api/paymentdata')
      .then(res => {
        if (res.data.Status === "Success") {

          setHostel(res.data.dataArray[0].hostel_name);
          setRoomNo(res.data.dataArray[0].room_no);
          setStrdate(res.data.dataArray[0].joining_date);
          setAmtpaid(res.data.dataArray[0].paid);
          setLeavetaken(res.data.dataArray[0].leave_taken);
        } else {

          setHostel("Please Upload Payment Details");
          setRoomNo("Please Upload Payment Details");
          setStrdate("No Data");
          setAmtpaid("No Data");
          setLeavetaken("0");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });


    axios.get('/api/data')
      .then(res => {
        if (res.data.Status === "Success") {
          setSchId(res.data.dataArray[0].scholarid);
          setSname(res.data.dataArray[0].name);
          setEmail(res.data.dataArray[0].email);
          setPhoneno(res.data.dataArray[0].phoneno);
          setGender(res.data.dataArray[0].gender);
          setDepartment(res.data.dataArray[0].department);
        } else {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });

    setTotalamount('25000')
    setPrice('125');



  }, []);

  let jDate = strdate;
  let jDate1 = jDate.slice(0, 10);
  let today = new Date().toISOString().slice(0, 10);

  const date1 = new Date(jDate1);
  const date2 = new Date(today);
  const diffInMilliseconds = date2 - date1;
  let daysBetween = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
  daysBetween = daysBetween - leavetaken;

  const jIST = jDate1.split('-').reverse().join('-');
  const tIST = today.split('-').reverse().join('-');



  // useEffect(() => {
  //   axios.get('/api/data')
  //     .then(res => {
  //       if (res.data.Status === "Success") { 
  //         setSchId(res.data.dataArray[0].scholarid);
  //         setHostel(res.data.dataArray[0].hostel_name);
  //         setRoomNo(res.data.dataArray[0].room_no);
  //         setStrdate(res.data.dataArray[0].joining_date);          
  //         setAmtpaid(res.data.dataArray[0].paid);           
  //         setLeavetaken(res.data.dataArray[0].leave_taken);
  //       } else { 
  //         navigate('/login');
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error:", error);
  //     });


  // }, []);



  const styles = {
    container: {
      position: 'relative',
      minHeight: '90vh',
      padding: '50px',
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(8px)', // Adjust the blur radius as needed
      zIndex: -1, // Ensure the background is behind the content
    },
    profileCard: {
      display: 'flex',
      border: '1px solid #ccc',
      padding: '30px',
      borderRadius: '10px',
      width: '80%',
      margin: '10px auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      position: 'relative', // Ensure content is positioned correctly over the background
      zIndex: 1, // Ensure the profile card is above the background
    },
    profilePicture: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '100px',
    },
    profileImage: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
    },
    profileInfo: {
      marginTop: '5px',
      textAlign: 'center',
    },
    editButton: {
      display: 'block',
      margin: '20px 10px',
      padding: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    profileDetails: {
      flex: 1,
    },
    ratings: {
      margin: '10px 0',
    },
    contactInfo: {
      marginTop: '10px',
    },
    basicInfo: {
      marginTop: '20px',
    },
    btnlink: {
      marginTop: '110px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      {props.role === "user" ? (
        <div>
          <div style={styles.profileCard}>
            <div style={styles.profilePicture}>
              <img
                src={profilepic}
                alt="Profile"
                style={styles.profileImage}
              />
              <div style={styles.profileInfo}>
                <h2>Name : {sname}</h2>
                <h4>{schId}</h4>
                <div style={styles.contactInfo}>
                  <h3>Contact Information</h3>
                  <p>Hostel Name : {hostel}</p>
                  <p>Room no : {roomNo}</p>
                  <p>Phone: +91-{phoneno}</p>
                  <p>Email: {email}</p>

                </div>
              </div>
            </div>
            <div style={styles.profileDetails}>
              <h2>{sname}</h2>
              <h4>Scholar Id : {schId}</h4>
              <div style={styles.ratings}>
              </div>


              <div style={styles.contactInfo}>
                <h3>---Summary---</h3>
                <p>Starting Date : <b>{jIST}</b></p>
                <p>No Of Days leave taken: <b>{leavetaken} days </b></p>
                <p>Duration of Stay:<b> {daysBetween} days </b></p>
                <p>Cost Per Day: <b>{price}/- </b></p>
                <p>Cost Till Today ({tIST}):<b> {daysBetween * price}/-</b></p>
                <p>Amount Paid:<b> {amtpaid}/-</b></p>
                <p> Need to pay: <b>{((daysBetween * price) - amtpaid) < 0 ? 0 : ((daysBetween * price) - amtpaid)}/- </b></p>
                <p>Refundable Amount: <b>{amtpaid - (daysBetween * price) < 0 ? 0 : amtpaid - (daysBetween * price)}/-</b></p>
                {/* <p>Total Amount: {totalamount}/-</p> */}
              </div>
              <div style={styles.basicInfo}>
                <h3>Basic Information</h3>
                <p>Department: {department}</p>
                <p>Gender: {gender}</p>
              </div>
            </div>
            <div style={styles.profileDetails}>
              <div style={styles.btnlink}>
                <Link to='/leave' style={styles.editButton}> Apply Leave</Link>
                <Link to='/menu' style={styles.editButton}> See Mess Menu</Link>
                <Link to='/complain' style={styles.editButton}> Complain</Link>
                <Link to='/contact' style={styles.editButton}>  Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.profileCard}>
            <div style={styles.profileDetails}>
              <h2>ADMIN PORTAL</h2>
              <div style={styles.profileDetails}>
                <div style={styles.btnlink}>
                  <NavLink to={'/addStudents'} style={styles.editButton}>
                    Add Student
                  </NavLink>
                  {/* <NavLink to={`/addPayment/${props.displayName}`}  style={styles.editButton}>
                    Add Payment
                  </NavLink> */}
                  <NavLink to={`/addPayment`} style={styles.editButton}>
                    Add Payment
                  </NavLink>

                  <NavLink to={`/approveLeave`} style={styles.editButton}>
                    Approve Leave
                  </NavLink>

                  <a href='/complain' style={styles.editButton}>
                    Change Menu
                  </a>
                  <a href='/contact' style={styles.editButton}>
                    Check Complain
                  </a>


                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
