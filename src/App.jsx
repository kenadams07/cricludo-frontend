import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./Components/Navigation"
import Home from "./Pages/Home"
import Share from "./Pages/Share"
import PrivacyPolicy from "./Pages/PrivacyPolicy"
import TermsAndConditions from "./Pages/TermsAndConditions"
import Error from "./Pages/Error"
import NotFound from "./Pages/NotFound"
import ErrorBoundary from "./utils/ErrorBoundary"
import "./App.css"

function App() {
   return (
      <ErrorBoundary>
         <Router>
            <div className='App'>
               <Navigation />
               <main className='main-content'>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/share' element={<Share />} />
                     <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                     <Route
                        path='/terms-and-conditions'
                        element={<TermsAndConditions />}
                     />
                     <Route path='/error' element={<Error />} />
                     <Route path='*' element={<NotFound />} />
                  </Routes>
               </main>
            </div>
         </Router>
      </ErrorBoundary>
   )
}

export default App
