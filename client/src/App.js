import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Creator from "./views/creator/creator";
import Details from "./views/detail/details";
import Home from "./views/home/home";
import Landing from "./views/landing/landing";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Landing} />
      <Route path="/home/:id" component={Details} />
      <Route path="/creator" component={Creator} />
    </div>
  );
}

export default App;
