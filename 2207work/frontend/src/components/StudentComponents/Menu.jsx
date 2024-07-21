import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const menuData = [
    {
        day: 'Sunday',
        breakfast: 'Bread, Butter, Boiled Egg or Fruits, Milk, Tea',
        lunch: 'Rice, Dal, Veg Fry, Soyabean with Sabji',
        snacks: 'Pakoda, Tea, Sauce',
        dinner: 'Fried Rice, Dal, Veg Fry, Chicken or Paneer Curry, Juice, Sweets'
    },
    {
        day: 'Monday',
        breakfast: 'Dal Paratha, Tea, Chutney',
        lunch: 'Rice, Dal, Veg Fry, Mixed Veg, Papad',
        snacks: 'Biscuit, Tea',
        dinner: 'Rice, Dal, Veg Fry, Egg Curry or Mixed Veg, Sawai'
    },
    {
        day: 'Tuesday',
        breakfast: 'Puri, Sabji, Tea',
        lunch: 'Rice, Dal, Veg Fry, Pakoda Sabji',
        snacks: 'Sandwich, Tea, Sauce',
        dinner: 'Rice, Dal, Veg Fry, Chicken Curry or Paneer Curry, Kheer'
    },
    {
        day: 'Wednesday',
        breakfast: 'Bread, Butter, Banana, Milk, Tea',
        lunch: 'Rice, Dal, Veg Fry, Mixed Veg, Papad',
        snacks: 'Chaat, Tea',
        dinner: 'Rice, Dal, Veg Fry, Chicken or Paneer Curry, Gulab Jamun'
    },
    {
        day: 'Thursday',
        breakfast: 'Uttapam, Sabji or Chutney, Tea',
        lunch: 'Rice, Dal, Veg Fry, Mixed Veg, Papad',
        snacks: 'Samosa, Tea, Sauce',
        dinner: 'Rice, Dal, Veg Fry, Chole, Bature'
    },
    {
        day: 'Friday',
        breakfast: 'Aloo Paratha, Tea',
        lunch: 'Rice, Dal, Veg Fry, Soyabean with Sabji',
        snacks: 'Veg Noodles, Tea',
        dinner: 'Fried Rice, Dal, Chicken or Paneer Curry, Suji'
    },
    {
        day: 'Saturday',
        breakfast: 'Chole, Bhature, Tea',
        lunch: 'Lemon Rice, Dal, Veg Fry, Papad',
        snacks: 'Samosa, Tea, Sauce',
        dinner: 'Rice, Dal, Veg Fry, Fish Curry or Paneer Ghujiya, Custard'
    }
];

export default function Menu() {


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


    
    return (
        <>
         <Header displayName={dname}/>
        
         <div style={styles.container}>
            <h1 style={styles.heading}>Mess Menu</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>DAYS</th>
                        <th style={styles.th}>BREAKFAST</th>
                        <th style={styles.th}>LUNCH</th>
                        <th style={styles.th}>SNACKS</th>
                        <th style={styles.th}>DINNER</th>
                    </tr>
                </thead>
                <tbody>
                    {menuData.map((item, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{item.day}</td>
                            <td style={styles.td}>{item.breakfast}</td>
                            <td style={styles.td}>{item.lunch}</td>
                            <td style={styles.td}>{item.snacks}</td>
                            <td style={styles.td}>{item.dinner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    );
}

const styles = {
    container: {
        minHeight: '90vh',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #4CAF50, #2196F3)', 
        color: 'white',

    },
    heading: {
        textAlign: 'center',
        margin: '20px 20px',

        fontSize: '2em',
        color: '#333',
    },
    table: {
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    th: {
        background: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    '@global': {
        body: {
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            height: '100vh',
        },
        code: {
            fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
        }
    }
};
