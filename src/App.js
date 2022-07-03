import { useReducer } from "react";
import "./App.css";

import { AppContext } from "./providers/AppContext";
import reducer from "./stores/Reducer";
import customerState from "./stores/customerState";
import MainBooking from "./components/main-booking/MainBooking";
import PaymentPage from "./components/payment-page/PaymentPage";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";

function App() {
  const [state, dispatch] = useReducer(reducer, customerState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainBooking />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
