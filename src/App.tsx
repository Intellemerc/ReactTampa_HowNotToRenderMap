import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Map from "./MapTestBed";
import PerTests from "./TestPerfFixes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">PerfTests</Link>
              </li>
              <li>
                <Link to="/Map">Map</Link>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Switch>
              <Route exact path="/" component={PerTests} />
              <Route path="/Map" exact component={Map} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
