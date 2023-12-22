// NotFound.js

import React from 'react';
import { Link } from 'react-router-dom'; 
import notFound from '../../assets/img/not_found.png'
const NotFound = () => {
  return (
    <div className="container">
      <section className="section error-404 d-flex flex-column align-items-center ">
        <h1>404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <Link to="/" className="btn">Back to home</Link>
        <img src={notFound} className="img-fluid " alt="Page Not Found" />
        <div className="credits" >
          Designed by <Link to="https://www.linkedin.com/company/riada-tech/">Riada Tech</Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
