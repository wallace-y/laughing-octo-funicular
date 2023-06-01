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
  const [liked, setLiked] = useState(false);

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
    setLiked(true);
    upvoteReview(review_id, 1).catch((err) => {
      if (err) {
        setVoteCount((currentCount) => currentCount - 1);
        setError("Something went wrong, please try again.");
        setLiked(false);
      }
    });
  }

  function downVote() {
    setVoteCount((currentCount) => currentCount - 1);
    setError(null);
    setLiked(false);
    upvoteReview(review_id, -1).catch((err) => {
      if (err) {
        setVoteCount((currentCount) => currentCount + 1);
        setError("Something went wrong, please try again.");
        setLiked(true);
      }
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

        <p className="blog-post-meta">
          {formattedDate}, <strong> {owner} </strong>
        </p>
        <p>{review_body}</p>

        <hr />
        <div className="container">
          <div className="row d-flex justify-content-end">
            <div className="col text-capitalize mt-auto">
              <strong>Category: {category}</strong>
            </div>
            <div className="col-auto">
              <div className="input-group justify-content-end">
                <div className="input-group-text">
                  <strong>{voteCount}</strong>
                </div>

                {liked ? (
                  <button onClick={downVote} className="btn btn-success border">
                    <i className="fa-solid fa-heart fa-xl"></i>
                  </button>
                ) : (
                  <button onClick={upvote} className="btn btn-light border">
                    <i className="fa-solid fa-heart fa-xl"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <CommentList />
      </article>
    </main>
  );
}

export default ReviewPage;
