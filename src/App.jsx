import Home from "./Components/Home";
import "./App.css";
import Nav from "./Components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./Components/Categories";
import ReviewsList from "./Components/ReviewsList";
import ReviewPage from "./Components/ReviewPage";
import UserList from "./Components/UserList";
import UserPage from "./Components/UserPage";
import Error from "./Components/Error";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/reviews/:review_id" element={<ReviewPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:username" element={<UserPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
