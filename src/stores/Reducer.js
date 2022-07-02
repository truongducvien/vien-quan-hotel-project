// Lưu tất cả những global state (redux, ...)
// Xử lý tất cả thay đổi của customerState dựa vào action

const SET_CUSTOMER_INFO = 'set_customer_info';


function reducer (state, action) {
   switch(action.type){
      case SET_CUSTOMER_INFO:
         return {
            ...state,
            customerInfo: {
               name: action.payload.name,
               age: action.payload.age,
               email: action.payload.email,
               phone: action.payload.phone,
            }
         }
      default:
         throw new Error("Invalid action")
   }
}

export default reducer;