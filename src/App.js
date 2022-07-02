import { useReducer } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import { AppContext } from './providers/AppContext';
import reducer from './stores/Reducer';
import customerState from './stores/customerState';
import HomePage from './components/HomePage';



function App() {
  const [state, dispatch] = useReducer(reducer, customerState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/payment' />
            </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
