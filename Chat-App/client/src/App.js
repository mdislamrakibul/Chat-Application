import React from 'react';
import Chat from './component/chat/Chat'
import Join from './component/join/Join'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/chat"  component={Chat}/>
    </Router>
  );
}

export default App;
