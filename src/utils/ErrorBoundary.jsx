import React from "react"

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props)
      this.state = { hasError: false, error: null, errorInfo: null }
   }

   static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
      return { hasError: true }
   }

   componentDidCatch(error, errorInfo) {
      // Log the error to console and any error reporting service
      console.error("ErrorBoundary caught an error:", error, errorInfo)

      this.setState({
         error: error,
         errorInfo: errorInfo,
      })
   }

   render() {
      if (this.state.hasError) {
         // Fallback UI
         return (
            <div className='error-boundary'>
               <div className='container'>
                  <div className='error-boundary-content text-center'>
                     <div className='error-icon'>
                        <span>🚨</span>
                     </div>
                     <h1>Something went wrong</h1>
                     <p>
                        We're sorry, but something unexpected happened. Please try
                        refreshing the page.
                     </p>

                     <div className='error-actions'>
                        <button
                           className='btn btn-primary'
                           onClick={() => window.location.reload()}
                        >
                           Refresh Page
                        </button>
                        <button
                           className='btn btn-secondary'
                           onClick={() =>
                              this.setState({
                                 hasError: false,
                                 error: null,
                                 errorInfo: null,
                              })
                           }
                        >
                           Try Again
                        </button>
                     </div>

                     {process.env.NODE_ENV === "development" && this.state.error && (
                        <details className='error-details'>
                           <summary>Error Details (Development)</summary>
                           <pre>{this.state.error && this.state.error.toString()}</pre>
                           <pre>{this.state.errorInfo.componentStack}</pre>
                        </details>
                     )}
                  </div>
               </div>
            </div>
         )
      }

      return this.props.children
   }
}

export default ErrorBoundary
