import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
   return (
      <div className='not-found-page'>
         <div className='container'>
            <div className='not-found-content text-center'>
               <div className='not-found-icon'>
                  <span>🔍</span>
               </div>
               <h1>404 - Page Not Found</h1>
               <p className='not-found-message'>
                  Sorry, the page you're looking for doesn't exist or has been moved.
               </p>

               <div className='not-found-actions'>
                  <Link to='/' className='btn btn-primary'>
                     Go Home
                  </Link>
                  <button
                     className='btn btn-outline'
                     onClick={() => window.history.back()}
                  >
                     Go Back
                  </button>
               </div>

               <div className='not-found-suggestions'>
                  <h3>Maybe you were looking for:</h3>
                  <ul>
                     <li>
                        <Link to='/'>Home Page</Link>
                     </li>
                     <li>
                        <Link to='/privacy-policy'>Privacy Policy</Link>
                     </li>
                     <li>
                        <Link to='/terms-and-conditions'>Terms & Conditions</Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NotFound
