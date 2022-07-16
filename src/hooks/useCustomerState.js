import { useReducer } from "react";
import reducer from "../stores/Reducer";
import customerState from "../stores/customerState";

function useCustomerState() {
  const [state, dispatch] = useReducer(reducer, customerState);

  return [state, dispatch];
}

export { useCustomerState };
