import Home from "./Components/Home";
import "./App.css";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import Categories from "./Components/Categories";
import ReviewsList from "./Components/ReviewsList";
import ReviewPage from "./Components/ReviewPage";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/reviews/:review_id" element={<ReviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
