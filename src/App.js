import { useReducer } from "react";
import "./App.css";

import { AppContext } from "./providers/AppContext";
import reducer from "./stores/Reducer";
import customerState from "./stores/customerState";
import RoomList from "./components/room-list/RoomList";

function App() {
  const [state, dispatch] = useReducer(reducer, customerState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div className="App">
        <RoomList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
