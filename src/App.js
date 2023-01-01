import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";
import ControlPanel from "./components/ControlPanel/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-form" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/controlPanel" element={<ControlPanel />} />
      </Routes>
    </div>
  );
}

export default App;
