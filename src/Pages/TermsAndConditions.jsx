import React from "react"

const TermsAndConditions = () => {
   return (
      <div className='page-container'>
         <div className='container'>
            <div className='page-header'>
               <h1 className='page-subtitle' >Terms and Conditions</h1>
               <p className='page-subtitle'>Last updated: October 25, 2024</p>
            </div>

            <div className='content-section'>
               <div className='card'>
                  <h2>Acceptance of Terms</h2>
                  <p>
                     By downloading, installing, or using the CRIC LUDO mobile
                     application, you agree to be bound by these Terms and Conditions. If
                     you do not agree to these terms, please do not use our application.
                  </p>
               </div>

               <div className='card'>
                  <h2>Description of Service</h2>
                  <p>
                     CRIC LUDO is a mobile gaming application that combines traditional
                     ludo gameplay with cricket-themed elements and live video calling
                     features. The app is developed and operated by 9X Technology LLC.
                  </p>
               </div>

               <div className='card'>
                  <h2>User Accounts</h2>
                  <h3>Account Creation</h3>
                  <ul>
                     <li>You must provide accurate and complete information</li>
                     <li>You are responsible for maintaining account security</li>
                     <li>One account per person</li>
                  </ul>

                  <h3>Account Responsibilities</h3>
                  <ul>
                     <li>Keep your login credentials secure</li>
                     <li>Notify us of any unauthorized access</li>
                     <li>You are responsible for all activities under your account</li>
                  </ul>
               </div>

               <div className='card'>
                  <h2>Acceptable Use</h2>
                  <h3>You May:</h3>
                  <ul>
                     <li>Play games according to the rules</li>
                     <li>Use video calling features appropriately</li>
                     <li>Connect with friends and family</li>
                  </ul>

                  <h3>You May Not:</h3>
                  <ul>
                     <li>Use the app for illegal activities</li>
                     <li>Harass or abuse other users</li>
                     <li>Attempt to hack or exploit the app</li>
                     <li>Share inappropriate content</li>
                     <li>Create multiple accounts to gain unfair advantage</li>
                  </ul>
               </div>

               <div className='card'>
                  <h2>In-App Purchases</h2>
                  <p>
                     CRIC LUDO may offer in-app purchases for virtual items, features, or
                     premium content. All purchases are final and non-refundable unless
                     required by law.
                  </p>
               </div>

               <div className='card'>
                  <h2>Intellectual Property</h2>
                  <p>
                     The CRIC LUDO app, including its design, graphics, and content, is
                     protected by intellectual property laws. You may not copy, modify, or
                     distribute our content without permission.
                  </p>
               </div>

               <div className='card'>
                  <h2>Privacy</h2>
                  <p>
                     Your privacy is important to us. Please review our Privacy Policy to
                     understand how we collect, use, and protect your information.
                  </p>
               </div>

               <div className='card'>
                  <h2>Limitation of Liability</h2>
                  <p>
                     To the maximum extent permitted by law, 9X Technology LLC shall not
                     be liable for any indirect, incidental, special, or consequential
                     damages arising from your use of the app.
                  </p>
               </div>

               <div className='card'>
                  <h2>Termination</h2>
                  <p>
                     We reserve the right to terminate or suspend your account at any time
                     for violations of these terms or for any other reason at our
                     discretion.
                  </p>
               </div>

               <div className='card'>
                  <h2>Changes to Terms</h2>
                  <p>
                     We may update these Terms and Conditions from time to time. We will
                     notify users of significant changes through the app or other means.
                  </p>
               </div>

               <div className='card'>
                  <h2>Contact Information</h2>
                  <p>
                     For questions about these Terms and Conditions, please contact us:
                  </p>
                  <p>
                     <strong>Email:</strong> info@cricludo.com
                     <br />
                     {/* <strong>Address:</strong> 108, 2020 Building, Al Quoz 3 Sheikh Zayed
                     Road, Dubai, UAE
                     <br /> */}
                     {/* <strong>Phone:</strong> Not Available */}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TermsAndConditions
