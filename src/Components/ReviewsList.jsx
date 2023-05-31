import loadingImage from "../assets/tic-tac-toe.gif";
import { useEffect, useState } from "react";
import { getAllReviews, getCategories } from "../utils";
import { Link, useSearchParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get("category");

  // get all reviews
  useEffect(() => {
    getAllReviews(categoryQuery).then((reviewData) => {
      setReviews(reviewData);
      setLoading(false);
      return reviewData;
    });
  }, [categoryQuery]);

  // get all categories
  useEffect(() => {
    getCategories()
      .then((categoryData) => {
        setCategories(categoryData);
        return categoryData;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <main className="text-center mt-5">
        <img
          style={{ width: "200px" }}
          src={loadingImage}
          alt="tic-tac-toe loading image"
        ></img>
      </main>
    );
  }

  return (
    <main>
      <h1 className="text-center mt-5">All Board Game Reviews</h1>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Designer</th>
            <th scope="col">Category</th>
            <th scope="col">Votes</th>
            <th scope="col">More Info</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => {
            return (
              <tr key={review.review_id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    style={{ width: "75px" }}
                    src={review.review_img_url}
                    alt={`Cover art for board game review for ${review.title}`}
                  ></img>
                </td>
                <td>{review.title}</td>
                <td>{review.designer}</td>
                <td>{review.category}</td>
                <td>{review.votes}</td>
                <td>
                  <Link
                    to={`/reviews/${review.review_id}`}
                    className="link-dark"
                  >
                    More Info
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center">
        <a
          className="link-dark"
          href="https://www.flaticon.com/free-animated-icons/table-game"
          title="table game animated icons"
        >
          Table game animated icons created by Freepik - Flaticon
        </a>
      </div>
    </main>
  );
}

export default ReviewsList;
