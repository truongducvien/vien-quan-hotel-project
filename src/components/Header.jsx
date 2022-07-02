
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

import '../style/Header.scss'
import SearchBar from "./SearchBar";
import logo from '../assets/images/ocean_villas_logo_6.png';
import header1 from '../assets/images/header-image-1.jpg'
import header2 from '../assets/images/header-image-2.jpg'
import header3 from '../assets/images/header-image-3.jpg'
import header4 from '../assets/images/header-image-4.jpg'




export default function Header () {
   return (
      <div className="header">
         <div className="images-slide">
            <Carousel autoplay autoplaySpeed={5000} speed={3000} effect='fade' pauseOnHover={false}>
               <div className='header-image'>
                  <img src={header1} />
               </div>
               <div className='header-image'> 
                  <img src={header2} />
               </div>
               <div className='header-image'>
                  <img src={header3} />
               </div>
               <div className='header-image'>
                  <img src={header4} />
               </div> 
            </Carousel>
         </div>
         <div className="logo">
            <img src={logo} alt="" />
         </div>
         <button className='bookNowButton'>Book now</button>
         
         <SearchBar />
      </div>
   )
}