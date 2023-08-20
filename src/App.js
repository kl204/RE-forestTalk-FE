import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderS from "./modules/route/Route";
import RegistBoard from "./modules/board/RegistBoard";
import "./App.css";
// import TestCom from "./component/TestComp";

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HeaderS />}/>
          <Route path="/RegistBoard" element={<HeaderS />}/>
          {/* <Route path="/" element={<UserBoard />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
