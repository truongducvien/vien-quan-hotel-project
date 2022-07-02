import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const now = new Date()
const tomorrow = new Date(now.getTime() + 24*60*60*1000)

console.log(tomorrow)
export default function SearchBar () {
   return (
      <div className="searchBar">
         <form action="">
            <div>
               <span>Check-in</span>
               <Space direction="vertical" size={12}>
                  <DatePicker defaultValue={moment(now, dateFormatList[0])} format={dateFormatList} />
               </Space>
            </div>

            <div>
               <span>Check-out</span>
               <Space direction="vertical" size={12}>
                  <DatePicker defaultValue={moment(tomorrow, dateFormatList[0])} format={dateFormatList} />
               </Space>
            </div>
         </form>
      </div>
   )
}