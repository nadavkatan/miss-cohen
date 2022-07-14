import React from 'react';
import {HomePage} from './app/pages/homePage/HomePage';
import {store} from './app/store';
import {Provider} from 'react-redux';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <HomePage/>
    </div>
    </Provider>
  );
}

export default App;
