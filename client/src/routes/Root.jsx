import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../Loading";
// const Movies = lazy(() => import('../Components/Movies/movies'));
const Hero = lazy(() => import("../Components/Hero/Hero"));

export default function Root() {
  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <Hero
            lineOne="Discover"
            subTextOne="Millions of Movies and TV Shows"
            subTitle="Explore"
            subTextTwo="Review, Rate, and Save Your Favorites!"
          />
        </Suspense>
      </div>

      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
