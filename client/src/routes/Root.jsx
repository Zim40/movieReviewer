import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../Loading";
// const Movies = lazy(() => import('../Components/Movies/movies'));
const Hero = lazy(() => import("../Components/Hero/Hero"));

export default function Root() {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await fetch("/api/movies");
  //       if (!response.ok) {
  //         throw new Error("Error fetching data:");
  //       }
  //       const movies = await response.json();
  //       setData(movies);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);
  // console.log(data);
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
