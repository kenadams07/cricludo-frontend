import React from "react"

const Home = () => {
   return (
      <div className='home-page'>
         {/* Hero Section */}
         <section className='hero'>
            <div className='container'>
               <div className='hero-content fade-in'>
                  <h1>CRIC LUDO</h1>
                  <p>The Ultimate Combo of Ludo, Cricket & Live Video Calling!</p>
                  <div className='hero-buttons'>
                     <a
                        href='https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo'
                        className='btn btn-primary'
                        target='_blank'
                        rel='noopener noreferrer'
                     >
                        Download Now
                     </a>
                     <a href='#features' className='btn btn-outline'>
                        Learn More
                     </a>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section id='features' className='section'>
            <div className='container'>
               <div className='section-title'>
                  <h2>Why Choose CRIC LUDO?</h2>
                  <p>
                     Experience the perfect blend of classic board games and modern
                     cricket excitement
                  </p>
               </div>

               <div className='features-grid'>
                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>🎮</div>
                     <h3>2 Games in 1 App</h3>
                     <p>
                        Switch between traditional ludo mode and our unique cricket-based
                        ludo version. Every dice roll feels like batting or bowling!
                     </p>
                  </div>

                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>🎥</div>
                     <h3>Live Video Calling</h3>
                     <p>
                        Enjoy the game in real-time with friends using our built-in video
                        calling feature. Laugh, celebrate, and strategize while seeing
                        your opponents live!
                     </p>
                  </div>

                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>👥</div>
                     <h3>Multiplayer Matches</h3>
                     <p>
                        Play online with friends, family, or random players worldwide.
                        Connect with players from around the globe!
                     </p>
                  </div>

                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>🏆</div>
                     <h3>Leaderboards & Rewards</h3>
                     <p>
                        Win games, earn points, and climb to the top of global rankings.
                        Compete with the best players worldwide!
                     </p>
                  </div>

                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>🚀</div>
                     <h3>Fast & Smooth</h3>
                     <p>
                        Optimized for all Android devices. Enjoy seamless gameplay with
                        lightning-fast performance!
                     </p>
                  </div>

                  <div className='feature-card slide-up'>
                     <div className='feature-icon'>🧠</div>
                     <h3>Strategy + Sports</h3>
                     <p>
                        Combines board game logic with the thrill of sports competition.
                        Perfect for strategy lovers!
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Game Modes Section */}
         <section className='section' style={{ backgroundColor: "#f8f9fa" }}>
            <div className='container'>
               <div className='section-title'>
                  <h2>Game Modes</h2>
                  <p>Choose your preferred way to play</p>
               </div>

               <div className='row'>
                  <div className='col-6'>
                     <div className='card'>
                        <h3>🏏 Cricket Ludo</h3>
                        <p>
                           Experience a whole new way to play with cricket-inspired ludo
                           gameplay. Every move counts in this exciting variant!
                        </p>
                        <ul>
                           <li>Cricket-themed gameplay</li>
                           <li>Batting and bowling mechanics</li>
                           <li>Strategic cricket moves</li>
                        </ul>
                     </div>
                  </div>

                  <div className='col-6'>
                     <div className='card'>
                        <h3>🎲 Classic Ludo</h3>
                        <p>
                           For players who enjoy the original ludo experience. Pure,
                           classic gameplay with modern features!
                        </p>
                        <ul>
                           <li>Traditional ludo rules</li>
                           <li>Classic board gameplay</li>
                           <li>Timeless fun</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Download Section */}
         <section className='section'>
            <div className='container'>
               <div className='section-title'>
                  <h2>Ready to Play?</h2>
                  <p>
                     Download CRIC LUDO now and enjoy ludo, cricket, and real-time fun—all
                     in one place!
                  </p>
               </div>

               <div className='text-center'>
                  <a
                     href='https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo'
                     className='btn btn-primary'
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     Download from Play Store
                  </a>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Home
