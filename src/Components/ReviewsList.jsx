import { useEffect, useState } from "react";
import { getAllReviews } from "../utils";
import { Link } from "react-router-dom";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews().then((reviewData) => {
      setReviews(reviewData);
      setLoading(false);
      return reviewData;
    });
  }, []);

  if (loading) {
    return (
      <main>
        <img
          style={{ width: "100px" }}
          src="src/assets/tic-tac-toe.gif"
          alt="tic-tac-toe loading image"
        ></img>
      </main>
    );
  }

  return (
    <main>
      <h1>All Board Game Reviews</h1>
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
      <a
        href="https://www.flaticon.com/free-animated-icons/table-game"
        title="table game animated icons"
      >
        Table game animated icons created by Freepik - Flaticon
      </a>
    </main>
  );
}

export default ReviewsList;
