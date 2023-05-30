import loadingImage from "../assets/tic-tac-toe.gif";

import { useParams, Navigate } from "react-router-dom";
import CommentList from "./CommentList";
import Error from "./Error";
import { useEffect, useState } from "react";
import { getReviewById } from "../utils";
import moment from "moment";
import Nav from "./Nav";

function ReviewPage() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //destructure the review
  const {
    title,
    designer,
    owner,
    review_img_url,
    review_body,
    category,
    created_at,
    votes,
    comment_count,
  } = singleReview;

  //format the date
  const formattedDate = moment(created_at).format("D MMM YYYY");

  useEffect(() => {
    getReviewById(review_id)
      .then((reviewData) => {
        setSingleReview(reviewData.review);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return (
      <main>
        <img
          style={{ width: "100px" }}
          src={loadingImage}
          alt="tic-tac-toe loading image"
        ></img>
      </main>
    );
  }

  return (
    <main>
      <article className="blog-post container">
        <h2 className="blog-post-title mb-1"> {title}</h2>
        <p className="blog-post-meta">
          {formattedDate} by {owner}
        </p>
        <p>{review_body}</p>
        <hr />
        <div className="container text-center">
          <div className="row">
            <p className="col">Category: {category}</p>
            <div className="col">
              <button>
                <i className="fa-solid fa-thumbs-up btn"></i>
              </button>
              <button>
                <i className="fa-solid fa-comment btn"></i>
              </button>
            </div>
          </div>
        </div>

        <CommentList />
      </article>
    </main>
  );
}

export default ReviewPage;
