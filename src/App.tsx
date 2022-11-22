import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Storage from "./pages/Storage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-left" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
