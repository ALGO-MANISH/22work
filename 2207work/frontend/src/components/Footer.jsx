import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  const style={
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#000000", /* adjust background color as needed */
    color: "white",
    textAlign: "center",
    padding: "15px 0", /* adjust padding as needed */
  }
  
    return (
    <footer style={style}>
        {/* <h1>helo from fooer</h1> */}
      <Container fluid>
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Created and owned by Shreya</p>
      </Container>
    </footer>
  );
}

export default Footer;
