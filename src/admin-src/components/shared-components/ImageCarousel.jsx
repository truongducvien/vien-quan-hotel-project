import 'antd/dist/antd.css';
import { Carousel } from 'antd';

const contentStyle = {
   width: '100%',
};

export default function ImageCarousel ( {imageLinks} ) {

   
   if(imageLinks && imageLinks.length>0){
      return (
         <div style={{width: "100px"}}>
            <Carousel autoplay>
               {imageLinks.map((link, index) => (
                  <div key={index}>
                     <img style={contentStyle} src={link} alt="" />
                  </div>
               ))}
            </Carousel>
         </div>
      )
   } else return (<span>(No data)</span>)
}