
import { useCustomerState } from '../hooks/useCustomerState'


function Demo () {
   const [state, dispatch] = useCustomerState()

   console.log(state);

   const handleCustomerInfo = () => {
      dispatch({
         type: 'set_customer_info',
         payload: {
            name: 'vien',
            age: 26,
            email: 'truongducvien97@gmail.com',
            phone: '0388599502'
         }
      })
   }

   return (
      <>
         <h3>Demo Component</h3>
         <button onClick={handleCustomerInfo}>Set customerInfo</button>
      </>
   )
}

export default Demo;


