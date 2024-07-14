import Navbar from "../Components/Navigation/nav";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header className="top-0 w-full">
        <Navbar />
      </header>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
