import React from 'react'
import Header from './_components/Header'
function Provider({children}) {
  return (
    <>
        <Header/>
        <div>{children}</div>
    </>

  )
}

export default Provider