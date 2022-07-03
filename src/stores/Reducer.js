// Lưu tất cả những global state (redux, ...)
// Xử lý tất cả thay đổi của customerState dựa vào action

const SET_BOOK_NOW_INFO = 'set_book_now_info'
const SET_CUSTOMER_INFO = 'set_customer_info';


function reducer (state, action) {
   let data = action.payload;

   switch(action.type){
      case SET_BOOK_NOW_INFO:
         return {
            ...state,
            date: {
               startDay: data.startDay,
               endDay: data.endDay,
            },
            guests: {
               adult: data.adult,
               children: data.children
            }
         }
      case SET_CUSTOMER_INFO:
         return {
            ...state,
            customerInfo: {
               name: data.name,
               age: data.age,
               email: data.email,
               phone: data.phone,
            }
         }
      default:
         throw new Error("Invalid action")
   }
}

export default reducer;