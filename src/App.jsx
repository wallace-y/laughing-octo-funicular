import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import loadingImage from "../src/assets/tic-tac-toe.gif";
const Home = lazy(() => import("./Components/Home"));
const Nav = lazy(() => import("./Components/Nav"));
const Categories = lazy(() => import("./Components/Categories"));
const ReviewsList = lazy(() => import("./Components/ReviewsList"));
const ReviewPage = lazy(() => import("./Components/ReviewPage"));
const UserList = lazy(() => import("./Components/UserList"));
const UserPage = lazy(() => import("./Components/UserPage"));
const Error = lazy(() => import("./Components/Error"));
const NewReview = lazy(() => import("./Components/NewReview"));
const Deleted = lazy(() => import("./Components/Deleted"));

function App() {
  return (
    <div className="bg-light">
      <Suspense
        fallback={
          <main className="text-center mt-5">
            <img
              style={{ width: "200px" }}
              src={loadingImage}
              alt="tic-tac-toe loading image"
            ></img>
          </main>
        }
      >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/reviews/new" element={<NewReview />} />
          <Route path="/reviews/:review_id" element={<ReviewPage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
