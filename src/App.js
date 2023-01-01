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
        <Route path="/ps_game" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/controlPanel" element={<ControlPanel />} />
        <Route path="*" element={<h1>Page Not Found 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
