import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Creator from "./views/creator/creator";
import Details from "./views/details/details";
import Home from "./views/home/home";
import Landing from "./views/landing/landing";
import Bar from "./components/filters/filters";
import Editor from "./views/editor/editor";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  // const allDogs = useSelector((state)=>state.allDogs)

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/creator" && <Bar />}
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
