import { useEffect, useState } from "react";
import { getAllReviews, getCategories } from "../utils";
import { Link, useSearchParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import OrderDropdown from "./OrderDropdown";
import moment from "moment";
import Error from "./Error";
import Loading from "./Loading";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get("category");
  const sortQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  // get all reviews
  useEffect(() => {
    getAllReviews(categoryQuery, sortQuery, orderQuery)
      .then((reviewData) => {
        setReviews(reviewData);
        setLoading(false);
        return reviewData;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
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
        setLoading(false);
        setError(err.message);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <main className="m-5 bg-light font-monospace">
      <h1 className="text-center mt-5">All Board Game Reviews</h1>
      <div className="container flex-column flex-sm-row d-flex justify-content-center mb-2">
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
        <table className="text-center table table-dark table-striped table-bordered border-light table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="d-none d-sm-table-cell">
                #
              </th>
              <th scope="col" className="d-block">
                Image
              </th>
              <th scope="col" className="d-none d-sm-table-cell">
                Date
              </th>
              <th scope="col" className="d-block">
                Title
              </th>
              <th scope="col" className="d-none d-sm-table-cell">
                Owner
              </th>
              <th scope="col" className="d-none d-sm-table-cell">
                Designer
              </th>
              <th
                scope="col"
                className="d-none d-md-none d-sm-table-cell d-lg-table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="d-none d-md-none d-sm-table-cell d-lg-table-cell"
              >
                Votes
              </th>
              <th
                scope="col"
                className="d-none d-md-none d-sm-table-cell d-lg-table-cell"
              >
                Comments
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {reviews.map((review, index) => {
              const formattedDate = moment(review.created_at).format(
                "D MMM YYYY"
              );

              return (
                <tr key={review.review_id}>
                  <th scope="row" className="d-none d-sm-table-cell">
                    {index + 1}
                  </th>
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
                  <td className="d-none d-sm-table-cell">{formattedDate}</td>
                  <td className="">{review.title}</td>
                  <td className="d-none d-sm-table-cell">{review.owner}</td>
                  <td className="d-none d-sm-table-cell">{review.designer}</td>
                  <td className="d-none d-md-none d-sm-table-cell d-lg-table-cell text-capitalize">
                    {review.category}
                  </td>
                  <td className="d-none d-md-none d-sm-table-cell d-lg-table-cell">
                    {review.votes}
                  </td>
                  <td className="d-none d-md-none d-sm-table-cell d-lg-table-cell">
                    {review.comment_count}
                  </td>
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
