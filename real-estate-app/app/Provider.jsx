import React from 'react'
import Header from './_components/Header'
function Provider({children}) {
  return (
    <>
        <Header/>
        <div className='mt-32'> 
        <div>{children}</div>
        </div>

    </>

  )
}

export default Provider