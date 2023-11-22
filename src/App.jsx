import { Route, Routes } from "react-router-dom";
import NewGame from "./components/NewGame";
import QuoteGenerator from "./components/QuoteGenerator";
import Play from "./components/Play";

const App = () => {
  return (
    <div className="main">
      <QuoteGenerator />
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
};

export default App;
