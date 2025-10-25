import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Share = () => {
   const [searchParams] = useSearchParams()
   const [showAppStoreButton, setShowAppStoreButton] = useState(false)
   const [deviceInfo, setDeviceInfo] = useState({ isAndroid: false, isIOS: false })
   const [statusMessage, setStatusMessage] = useState("Opening CRIC LUDO...")
   const [appOpened, setAppOpened] = useState(false)

   const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isAndroid = /android/.test(userAgent)
      const isIOS = /iphone|ipad|ipod/.test(userAgent)

      console.log("Device Detection - Android:", isAndroid, "iOS:", isIOS)
      return { isAndroid, isIOS }
   }

   const attemptDeepLink = (roomId) => {
      const deepLinkUrl = `cricludo://share?id=${roomId || ""}`
      const androidIntentUrl = `intent://share?id=${
         roomId || ""
      }#Intent;scheme=cricludo;package=com.nineXTechnology.CricLudo;end`
      const playStoreUrl = `https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo`

      console.log("Attempting deep link:", deepLinkUrl)
      console.log("Android Intent URL:", androidIntentUrl)

      // Method 1: Try Android Intent URL first (most reliable for Android)
      if (deviceInfo.isAndroid) {
         try {
            window.location.href = androidIntentUrl
         } catch (error) {
            console.log("Android Intent method failed:", error)
         }
      }

      // Method 2: Try custom scheme deep link
      setTimeout(() => {
         try {
            window.location.href = deepLinkUrl
         } catch (error) {
            console.log("Custom scheme method failed:", error)
         }
      }, 500)

      // Method 3: Try creating a hidden iframe with Android Intent
      setTimeout(() => {
         const iframe = document.createElement("iframe")
         iframe.style.display = "none"
         iframe.src = deviceInfo.isAndroid ? androidIntentUrl : deepLinkUrl
         document.body.appendChild(iframe)

         setTimeout(() => {
            if (document.body.contains(iframe)) {
               document.body.removeChild(iframe)
            }
         }, 1000)
      }, 1000)

      // Method 4: Try creating a temporary link
      setTimeout(() => {
         const link = document.createElement("a")
         link.href = deviceInfo.isAndroid ? androidIntentUrl : deepLinkUrl
         link.style.display = "none"
         document.body.appendChild(link)
         link.click()
         document.body.removeChild(link)
      }, 1500)

      // Method 5: Try window.open as last resort
      setTimeout(() => {
         try {
            window.open(deviceInfo.isAndroid ? androidIntentUrl : deepLinkUrl, "_self")
         } catch (error) {
            console.log("Window open method failed:", error)
         }
      }, 2000)
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
      if (appOpened) {
         return "Open CRIC LUDO Again"
      }
      return deviceInfo.isAndroid ? "Open CRIC LUDO" : "Open CRIC LUDO"
   }

   const handleAppStoreClick = () => {
      const roomId = searchParams.get("id")

      if (appOpened) {
         // Try to open the app again
         attemptDeepLink(roomId)
         setStatusMessage("Opening CRIC LUDO...")
         setShowAppStoreButton(false)

         setTimeout(() => {
            setShowAppStoreButton(true)
            setStatusMessage("Tap to open CRIC LUDO")
         }, 2000)
      } else {
         // Try direct app opening first, then fallback to Play Store
         const androidIntentUrl = `intent://share?id=${
            roomId || ""
         }#Intent;scheme=cricludo;package=com.nineXTechnology.CricLudo;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo;end`
         const deepLinkUrl = `cricludo://share?id=${roomId || ""}`

         if (deviceInfo.isAndroid) {
            // Use Android Intent with fallback to Play Store
            try {
               window.location.href = androidIntentUrl
            } catch (error) {
               console.log("Android Intent failed, opening Play Store:", error)
               window.open(getAppStoreUrl(), "_blank")
            }
         } else {
            // For iOS or other devices, try deep link then Play Store
            try {
               window.location.href = deepLinkUrl
               // If deep link fails, it will fallback to Play Store
               setTimeout(() => {
                  window.open(getAppStoreUrl(), "_blank")
               }, 1000)
            } catch (error) {
               window.open(getAppStoreUrl(), "_blank")
            }
         }
      }
   }

   useEffect(() => {
      console.log("CRIC LUDO Share Page Loaded")
      console.log("User Agent:", navigator.userAgent)
      console.log("URL:", window.location.href)

      const device = detectDevice()
      setDeviceInfo(device)

      const roomId = searchParams.get("id")
      if (!roomId) {
         console.error("No room ID provided in URL")
         return
      }

      console.log("Room ID:", roomId)

      // Attempt deep link immediately
      attemptDeepLink(roomId)

      // Set up detection for app opening
      let appDetectionTimer
      let fallbackTimer

      const handleVisibilityChange = () => {
         if (document.hidden) {
            console.log("Page became hidden - app might have opened")
            setAppOpened(true)
            setStatusMessage("CRIC LUDO opened successfully!")
            clearTimeout(fallbackTimer)
         } else {
            console.log("Page became visible - app might not have opened")
         }
      }

      const handleBlur = () => {
         console.log("Window lost focus - app might have opened")
         setAppOpened(true)
         setStatusMessage("CRIC LUDO opened successfully!")
         clearTimeout(fallbackTimer)
      }

      const handlePageHide = () => {
         console.log("Page hide event - app opened")
         setAppOpened(true)
         setStatusMessage("CRIC LUDO opened successfully!")
         clearTimeout(fallbackTimer)
      }

      // Listen for app opening events
      document.addEventListener("visibilitychange", handleVisibilityChange)
      window.addEventListener("blur", handleBlur)
      window.addEventListener("pagehide", handlePageHide)

      // Fallback: Show app store button after 3 seconds
      fallbackTimer = setTimeout(() => {
         if (!appOpened) {
            setShowAppStoreButton(true)
            setStatusMessage("Tap to open CRIC LUDO")
            console.log("Showing fallback button")
         }
      }, 3000)

      // Cleanup
      return () => {
         clearTimeout(fallbackTimer)
         clearTimeout(appDetectionTimer)
         document.removeEventListener("visibilitychange", handleVisibilityChange)
         window.removeEventListener("blur", handleBlur)
         window.removeEventListener("pagehide", handlePageHide)
      }
   }, [searchParams])

   const roomId = searchParams.get("id")

   if (!roomId) {
      return (
         <div className='share-page'>
            <div className='container'>
               <div className='share-content text-center'>
                  <div className='error-icon'>
                     <span>❌</span>
                  </div>
                  <h1>Invalid Share Link</h1>
                  <p className='error-message'>
                     No room ID provided in the URL. Please check the link and try again.
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
                  {statusMessage}
               </p>

               {!showAppStoreButton && (
                  <div className='loading-spinner' id='spinner'></div>
               )}

               {showAppStoreButton && (
                  <button onClick={handleAppStoreClick} className='app-store-button'>
                     {getButtonText()}
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

export default Share
