import { useReducer } from 'react';
import './App.css';

import { AppContext } from './providers/AppContext';
import reducer from './stores/Reducer';
import customerState from './stores/customerState';
import Demo from './components/Demo';



function App() {
  const [state, dispatch] = useReducer(reducer, customerState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div className="App">
          <Demo />
      </div>
    </AppContext.Provider>
  );
}

export default App;
