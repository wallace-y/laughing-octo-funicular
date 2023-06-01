import loadingImage from "../assets/tic-tac-toe.gif";
import { useEffect, useState } from "react";
import { getAllReviews, getCategories } from "../utils";
import { Link, useSearchParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import OrderDropdown from "./OrderDropdown";
import moment from "moment";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get("category");
  const sortQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  // get all reviews
  useEffect(() => {
    getAllReviews(categoryQuery, sortQuery, orderQuery).then((reviewData) => {
      setReviews(reviewData);
      setLoading(false);
      return reviewData;
    });
  }, [categoryQuery, sortQuery, orderQuery]);

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
    <main className="m-5">
      <h1 className="text-center mt-5">All Board Game Reviews</h1>
      <div className="container d-flex justify-content-center mb-2">
        <CategoryDropdown
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SortDropdown
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <OrderDropdown
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="table-responsive">
        <table className="text-center table table-light table-striped table-bordered border-dark table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Owner</th>
              <th scope="col">Designer</th>
              <th scope="col">Category</th>
              <th scope="col">Votes</th>
              <th scope="col">Comments</th>
            </tr>
          </thead>
          <tbody className="">
            {reviews.map((review, index) => {
              const formattedDate = moment(review.created_at).format(
                "D MMM YYYY"
              );

              return (
                <tr key={review.review_id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link
                      to={`/reviews/${review.review_id}`}
                      className="link-dark"
                    >
                      {" "}
                      <img
                        style={{ width: "75px" }}
                        src={review.review_img_url}
                        alt={`Cover art for board game review for ${review.title}`}
                      ></img>
                    </Link>
                  </td>
                  <td>{formattedDate}</td>
                  <td>{review.title}</td>
                  <td>{review.owner}</td>
                  <td>{review.designer}</td>
                  <td className="text-capitalize">{review.category}</td>
                  <td>{review.votes}</td>
                  <td>{review.comment_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
