import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Share = () => {
   const [searchParams] = useSearchParams()
   const [showAppStoreButton, setShowAppStoreButton] = useState(false)
   const [deviceInfo, setDeviceInfo] = useState({ isAndroid: false, isIOS: false })

   const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isAndroid = /android/.test(userAgent)
      const isIOS = /iphone|ipad|ipod/.test(userAgent)

      console.log("Device Detection - Android:", isAndroid, "iOS:", isIOS)
      return { isAndroid, isIOS }
   }

   const attemptDeepLink = (userId) => {
      const deepLinkUrl = `cricludo://share?id=${userId || ""}`

      console.log("Attempting deep link:", deepLinkUrl)

      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = deepLinkUrl
      document.body.appendChild(iframe)

      setTimeout(() => {
         document.body.removeChild(iframe)
      }, 1000)
   }

 
   const getAppStoreUrl = () => {
      if (deviceInfo.isAndroid) {
         return "https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo"
      } else if (deviceInfo.isIOS) {
         return "https://apps.apple.com/app/"
      } else {
         return "https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo"
      }
   }


   const getButtonText = () => {
      return deviceInfo.isAndroid ? "Open in Play Store" : "Open in App Store"
   }

   useEffect(() => {
      console.log("CRIC LUDO Share Page Loaded")
      console.log("User Agent:", navigator.userAgent)
      console.log("URL:", window.location.href)

    
      const device = detectDevice()
      setDeviceInfo(device)

     
      const userId = searchParams.get("id")
      if (!userId) {
         console.error("No user ID provided in URL")
         return
      }

      console.log("User ID:", userId)

    
      attemptDeepLink(userId)

      const timer = setTimeout(() => {
         setShowAppStoreButton(true)
         console.log("Showing app store button")
      }, 1000)

 
      const handleVisibilityChange = () => {
         if (document.hidden) {
            console.log("Page became hidden - app might have opened")
         } else {
            console.log("Page became visible - app might not have opened")
         }
      }

    
      const handleBlur = () => {
         console.log("Window lost focus - app might have opened")
      }

      document.addEventListener("visibilitychange", handleVisibilityChange)
      window.addEventListener("blur", handleBlur)

   
      return () => {
         clearTimeout(timer)
         document.removeEventListener("visibilitychange", handleVisibilityChange)
         window.removeEventListener("blur", handleBlur)
      }
   }, [searchParams])

   const userId = searchParams.get("id")

   if (!userId) {
      return (
         <div className='share-page'>
            <div className='container'>
               <div className='share-content text-center'>
                  <div className='error-icon'>
                     <span>❌</span>
                  </div>
                  <h1>Invalid Share Link</h1>
                  <p className='error-message'>
                     No user ID provided in the URL. Please check the link and try again.
                  </p>
                  <div className='error-actions'>
                     <a href='/' className='btn btn-primary'>
                        Go Home
                     </a>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className='share-page'>
         <div className='container'>
            <div className='share-content text-center'>
               <div className='logo'>
                  <span>CRIC</span>
               </div>
               <h1 className='title'>CRIC LUDO</h1>
               <p className='subtitle' id='statusText'>
                  {showAppStoreButton ? "App not installed?" : "Opening CRIC LUDO..."}
               </p>

               {!showAppStoreButton && (
                  <div className='loading-spinner' id='spinner'></div>
               )}

               {showAppStoreButton && (
                  <a
                     href={getAppStoreUrl()}
                     className='app-store-button'
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     {getButtonText()}
                  </a>
               )}
            </div>
         </div>
      </div>
   )
}

export default Share
