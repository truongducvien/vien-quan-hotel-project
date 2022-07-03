<<<<<<< HEAD
import { useReducer } from "react";
import "./App.css";
=======
import { useReducer } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import { AppContext } from './providers/AppContext';
import reducer from './stores/Reducer';
import customerState from './stores/customerState';
import HomePage from './components/HomePage';

>>>>>>> test0307

import { AppContext } from "./providers/AppContext";
import reducer from "./stores/Reducer";
import customerState from "./stores/customerState";
import RoomList from "./components/room-list/RoomList";

function App() {
  const [state, dispatch] = useReducer(reducer, customerState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
<<<<<<< HEAD
      <div className="App">
        <RoomList />
      </div>
=======
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/payment' />
            </Routes>
        </div>
      </BrowserRouter>
>>>>>>> test0307
    </AppContext.Provider>
  );
}

export default App;
