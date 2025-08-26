import React from 'react'
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from '@mui/icons-material'
import '../Style/componentStyles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">

        <div className="footer-section">
          <h3>CONTACT</h3>
          <p><Phone fontSize='small' /> Phone: +96369793510</p>
          <p><Mail fontSize='small' /> Email: jaber@gmail.com</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Me</h3>
          <div className="social-links">
            <a href='' target='_blank' rel='noopener noreferrer'>
              <GitHub className='social-icon' />
            </a>
            <a href='' target='_blank' rel='noopener noreferrer'>
              <LinkedIn className='social-icon' />
            </a>
            <a href='' target='_blank' rel='noopener noreferrer'>
              <YouTube className='social-icon' />
            </a>
            <a href='' target='_blank' rel='noopener noreferrer'>
              <Instagram className='social-icon' />
            </a>
          </div>
        </div>

        <div className="footer-section">

          <h3>About</h3>
          <p>We have modern products for you</p>
        </div>



      </div>

      <div className="footer-bottom">
          <p>&copy; 2025 Ahmad Coding . All rights reserved </p>
        </div>
        
    </footer>
  )
}

export default Footer

