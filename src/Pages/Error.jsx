import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
   return (
      <div className='error-page'>
         <div className='container'>
            <div className='error-content text-center'>
               <div className='error-icon'>
                  <span>⚠️</span>
               </div>
               <h1>Oops! Something went wrong</h1>
               <p className='error-message'>
                  We're sorry, but something unexpected happened. Our team has been
                  notified and is working to fix the issue.
               </p>

               <div className='error-actions'>
                  <Link to='/' className='btn btn-primary'>
                     Go Home
                  </Link>
                  <button
                     className='btn btn-secondary'
                     onClick={() => window.location.reload()}
                  >
                     Try Again
                  </button>
               </div>

               <div className='error-help'>
                  <h3>Need Help?</h3>
                  <p>If the problem persists, please contact our support team:</p>
                  <p>
                     <strong>Email:</strong> info@9xtechnology.com
                     <br />
                     <strong>Phone:</strong> +971 52 228 0076
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Error
