import { lazy, Suspense} from "react";
import Loading from './Loading';
const Images = lazy(() => import('./image'));

// import viteLogo from "/vite.svg";
import "./App.css";
// const testUser = {
//   firstName: "test3",
//   lastName: "thomp",
//   email: "test3@gmail.com",
// };

function App() {

  return (
    <>
      <section>
        <div className="flex align-center items-center justify-center">
        <Suspense fallback={<Loading />}>
          <Images />
          </Suspense>
        </div>
        <h1 className="flex align-center items-center justify-center">Vite + React</h1>
        <div className="flex align-center items-center justify-center">
        
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="flex align-center items-center justify-center">
          Click on the Vite and React logos to learn more
        </p>
      </section>
    </>
  );
}

export default App;
