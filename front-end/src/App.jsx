import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {DataProvider} from "./GlobalState"
import Header from "./components/header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Homepage />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
