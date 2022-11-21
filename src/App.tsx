import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Storage from "./pages/Storage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
