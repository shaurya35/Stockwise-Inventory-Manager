import React from 'react'

function LoginButton({ title="ADD TITLE", isLoading=false , ...rest}) {
    // if (isLoading) {
    //     return (
    //       <>
    //         <button className="outFit loading" disabled={isLoading}>
    //           <span>Login</span>
    //         </button>
    //       </>
    //     );
    //   }
      return (
        <>
          <button 
          className={`outFit ${isLoading ? "loading" : ""}`}
          {...rest}
          >
            <span>{title}</span>
        </button>
        </>
      );
}

export default LoginButton