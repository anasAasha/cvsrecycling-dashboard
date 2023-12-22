import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
    <div className="copyright">
      © Copyright <strong><span>Riada Tech</span></strong>. All Rights Reserved
    </div>
    <div className="credits"> 
      Designed by <Link to=''>Riada Tech</Link>
    </div>
  </footer>
  )
}

export default Footer