import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                <Link to="/Perf">PerfTests</Link>
              </li>
              <li>
                <Link to="/Map">Map</Link>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Route path="/" exact component={Map} />
            <Route path="/Perf" component={PerTests} />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
