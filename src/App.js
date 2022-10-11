import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Todos from "./components/todos/Todos";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
