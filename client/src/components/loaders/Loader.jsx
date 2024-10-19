import React from 'react'

function Loader({ title="ADD TITLE", isLoading=false , ...rest}) {
      return (
        <>
          <button 
          className={`outfit ${isLoading ? "loading" : ""}`}
          {...rest}
          >
            <span>{title}</span>
        </button>
        </>
      );
}

export default Loader