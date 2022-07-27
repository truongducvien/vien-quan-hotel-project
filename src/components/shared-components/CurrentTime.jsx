import { useState, useEffect } from 'react'

import moment from 'moment'
import '../../style/CurrentTime.scss'

export default function CurrentTime () {
   const [now, setNow] = useState(moment()._d.getTime())

   useEffect(()=> {
      setInterval(()=> {
         setNow(moment()._d.getTime())
      },1000)
      return clearInterval()
   }, [])

   return (
      <div className='clock'>
         <span>{moment(now).format("MMMM Do YYYY HH:mm:ss")}</span>
      </div>
   )
}