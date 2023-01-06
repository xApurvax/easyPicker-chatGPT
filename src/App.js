import Header from "./components/layout/Header";
import HeaderNew from "./components/layout/HeaderNew";
import NavbarNew from "./components/layout/NavbarNew";
import Tool from "./components/main/Tool";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LogIn";

function App() {
  return (
    <div className="">
        {/* <Tool /> */}
        {/* <Header /> */}
    <NavbarNew />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderNew />} />
          {/* <Route path="/auth/login" element={<LogIn />} /> */}
          <Route path="/auth/signin" element={<LogIn />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
