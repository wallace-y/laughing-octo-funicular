import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
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
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
