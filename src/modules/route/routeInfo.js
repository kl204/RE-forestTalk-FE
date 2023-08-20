import FileBoard from "../board/FileBoard";
import UserBoard from "../board/UserBoard";
import LoginForm from "../user/LoginForm";
import SignupForm from "../user/SignupForm";
import RegistBoard from "../board/RegistBoard";
import FileBoardDetail from "../board/FileBoardDetail";
import DetailBoard from "../board/DetailBoard";
import RegistFileBoard from "../board/RegistFileBoard";

export const pathInfo = [
  { board: ["userboard", "fileBoard"] },
  { main: ["main1", "main2"] },
];

export const routeInfo = (path) => {
  switch (path) {
    case "/board/fileBoard":
      return <FileBoard />;
    case "/board/userboard":
      console.log("path", path);
      return <UserBoard />;
    case "/login":
      console.log("path", path);
      return <LoginForm />;
    case "/signup":
      console.log("path", path);
      return <SignupForm />;
    case "/board/detail":
      console.log("path", path);
      return <FileBoardDetail />;
    case "/board/registfileboard":
      console.log("path", path);
      return <RegistFileBoard />;
    case "/board/registboard":
      console.log("path", path);
      return <RegistBoard />;
    case "/board/detailboard":
      console.log("path", path);
      return <DetailBoard />;
    default:
      return <div style={{ backgroundColor: "white" }}></div>;
  }
};
