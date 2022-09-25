import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {DataProvider} from "./GlobalState"
import Header from "./components/header";
import Homepage from "./pages/Homepage";
import Footer from "./components/footer";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Homepage />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
