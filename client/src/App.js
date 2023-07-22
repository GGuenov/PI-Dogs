import { Route, Routes } from "react-router-dom";
import "./App.css";
import Creator from "./views/creator/creator";
import Details from "./views/detail/details";
import Home from "./views/home/home";
import Landing from "./views/landing/landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/creator" element={<Creator />} />
      </Routes>
    </div>
  );
}

export default App;
