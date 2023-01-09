import Header from "./components/layout/Header";
import HeaderNew from "./components/layout/HeaderNew";
import NavbarNew from "./components/layout/NavbarNew";
import Tool from "./components/layout/Tool";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";

function App() {
  return (
    <div className="">
    <NavbarNew />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderNew Tool={<Tool />} />} />
          <Route path="/auth/login" element={<HeaderNew LogIn={<LogIn />}  />} />
          <Route path="/auth/register" element={<HeaderNew SignIn={<SignIn />} />} />
        </Routes>
        {/* <Routes>
        <Route path="/" element={<Tool />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<SignIn />} />
        </Route>
        </Routes> */}
    </BrowserRouter>
    </div>
  );
}

export default App;
