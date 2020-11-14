import React from 'react'
import {Header, ChildHeader, Banner} from './Header'
import HomeAdds from './Home'
import {Footer , FooterEnd} from './footer'

function MainOLX() {
  return(
   <div>
    < Header />
    < ChildHeader />
    <br />

    < Banner />

    <br />
    <br />
    <br />

    < HomeAdds />
    < Footer />
    < FooterEnd />
   </div>
  )
}

export default MainOLX;