import React from 'react';
import './App.scss';
import logo from './hd-plus.jpg';
// import Channels from './channels';

import Channels from './channels';

function App() {
  return (
    <div className="App">
      <nav className="menu">
        <a><img src={logo} /></a>
        {/* <a> &#8801;</a> */}
      </nav>

      <Channels />

    </div>
  );
}

export default App;
