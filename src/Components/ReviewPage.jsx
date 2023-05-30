import loadingImage from "../assets/tic-tac-toe.gif";

import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import Error from "./Error";
import { useEffect, useState } from "react";
import { getReviewById, upvoteReview } from "../utils";
import moment from "moment";

function ReviewPage() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

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

  //upvoting a review

  function upvote() {
    setVoteCount((currentCount) => currentCount + 1);
    setError(null);
    upvoteReview(review_id, 1).catch((err) => {
      if (err) {
        setVoteCount((currentCount) => currentCount - 1);
        setError("Something went wrong, please try again.");
      }
      true;
    });
  }

  useEffect(() => {
    getReviewById(review_id)
      .then((reviewData) => {
        setSingleReview(reviewData.review);
        setLoading(false);
        // setting initial comment count to allow optimistic rendering
        setVoteCount(reviewData.review.votes);
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
      <article className="blog-post container">
        <h2 className="blog-post-title mb-1 mt-5"> {title}</h2>
        <h3 className="position-relative">
          <span className="badge bg-success rounded-pill position-absolute top-0 end-0">
            {voteCount}
          </span>
        </h3>
        <p className="blog-post-meta">
          {formattedDate}, <strong> {owner} </strong>
        </p>
        <p>{review_body}</p>

        <hr />
        <div className="container text-center">
          <div className="row">
            <p className="col">Category: {category}</p>
            <div className="col">
              <button onClick={upvote} className="btn btn-success">
                <i className="fa-solid fa-thumbs-up fa-xl btn"></i>
              </button>
              <button className="btn btn-success mx-1">
                <i className="fa-solid fa-comment fa-xl btn"></i>
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
