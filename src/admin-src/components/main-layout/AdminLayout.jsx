import header1 from '../../../assets/images/header-image-1.jpg'
import header2 from '../../../assets/images/header-image-2.jpg'
import header3 from '../../../assets/images/header-image-3.jpg'
import header5 from '../../../assets/images/header-image-5.jpg'
import header6 from '../../../assets/images/header-image-6.jpg'

import home_symbol from '../../../assets/images/home-symbol.png'

import { Carousel } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import '../../style/AdminLayout.scss'

export default function AdminLayout () {
   const navigate = useNavigate()
   const handleExit = () => {
      navigate('/')
   }
   
   return (
      <>
         <div onClick={handleExit} className="exit-admin-btn" title="Exit Admin">
            <img src={home_symbol} alt="" />
         </div>

         <div className='adminLayout'>
            <div className='navLink-btn'>
               <div className='btn-container'>
                  <NavLink to={'room_management'}>Rooms</NavLink>
                  <NavLink to={'users_management'}>Users</NavLink>
                  <NavLink to={'booking_management'}>Bookings</NavLink>
                  <NavLink to={'analysis'}>Analysis</NavLink>
               </div>
            </div>

            <div className="images-slide">
               <Carousel
                  className='image-slide-carousel'
                  autoplay
                  autoplaySpeed={6000}
                  speed={2000}
                  effect="fade"
                  arrows
                  pauseOnHover={false}
               >
                  <div className="header-image">
                     <img src='https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="" />
                  </div>
                  <div className="header-image">
                     <img src='https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="" />
                  </div>
                  <div className="header-image">
                     <img src={header5} alt="" />
                  </div>
                  <div className="header-image">
                     <img src={header6} alt="" />
                  </div>
               </Carousel>
            </div>
         </div>
      </>
   )
}