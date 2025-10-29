import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navigation = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const location = useLocation()

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const closeMenu = () => {
      setIsMenuOpen(false)
   }

   return (
      <nav className='navbar'>
         <div className='container'>
            <div className='navbar-content'>
               <Link to='/' className='navbar-brand' onClick={closeMenu}>
                  <span className="decoration-black">CRIC LUDO</span>
               </Link>

               {/* Mobile menu button */}
               <button
                  className='mobile-menu-btn'
                  onClick={toggleMenu}
                  aria-label='Toggle menu'
               >
                  <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
                     <span></span>
                     <span></span>
                     <span></span>
                  </span>
               </button>

               {/* Navigation menu */}
               <ul className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
                  <li>
                     <Link
                        to='/'
                        className={`nav-link ${
                           location.pathname === "/" ? "active" : ""
                        }`}
                        onClick={closeMenu}
                     >
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link
                        to='/privacy-policy'
                        className={`nav-link ${
                           location.pathname === "/privacy-policy" ? "active" : ""
                        }`}
                        onClick={closeMenu}
                     >
                        Privacy Policy
                     </Link>
                  </li>
                  <li>
                     <Link
                        to='/terms-and-conditions'
                        className={`nav-link ${
                           location.pathname === "/terms-and-conditions" ? "active" : ""
                        }`}
                        onClick={closeMenu}
                     >
                        Terms & Conditions
                     </Link>
                  </li>
                  <li>
                     <a
                        href='https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo'
                        className='btn btn-primary'
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={closeMenu}
                     >
                        Playstore App
                     </a>
                  </li>
                    <li>
                     <a
                        href='https://apps.apple.com/ae/app/cricludo/id6741326528'
                        className='btn btn-primary'
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={closeMenu}
                     >
                        Apple Store
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Navigation
