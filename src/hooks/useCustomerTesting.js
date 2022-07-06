import { useReducer } from "react";
import customerTest from "../stores/customerTest";
import reducerTesting from "../stores/ReducerTesting";

function useCustomerTesting() {
  const [state, dispatch] = useReducer(reducerTesting, customerTest);

  return [state, dispatch];
}

export { useCustomerTesting };
