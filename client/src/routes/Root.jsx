import Navbar from "../Components/Navigation/nav";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../Loading";
const Image = lazy(() => import("../Components/Hero/Hero"));

export default function Root() {
  return (
    <>
      <header className="top-0 w-full">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <div>
            <Image
              lineOne="Discover"
              subTextOne="Millions of Movies and TV Shows"
              subTitle="Explore"
              subTextTwo="Review, Rate, and Save Your Favorites!"
            />
          </div>
        </Suspense>
      </header>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
