import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/nav";

export default function Header() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
