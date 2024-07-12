// import Navbar from "../Components/nav";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app">Test link</Link>
          </li>
        </ul>
      </nav>

      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
