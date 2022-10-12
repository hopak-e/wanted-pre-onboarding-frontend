import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
