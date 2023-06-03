import { Link, useParams, Navigate } from "react-router-dom";
import CommentList from "./CommentList";
import Error from "./Error";
import { useEffect, useState, useContext } from "react";
import { getReviewById, upvoteReview, deleteReview } from "../utils";
import moment from "moment";
import { UserContext } from "../contexts/User";
import Loading from "./Loading";

function ReviewPage() {
  const { user } = useContext(UserContext);
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

  // downvote a review
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

  // delete a review
  function handleDelete() {
    setLoading(true);
    deleteReview(review_id)
      .then((res) => {
        setLoading(false);
        setDeleted(true);
      })
      .catch((err) => {
        setError(
          "Look's like something went wrong. Please refresh and try again."
        );
        setDeleted(false);
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
    return <Loading />;
  }

  if (deleted) {
    return <Navigate to="/deleted" replace={true} />;
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
              <p className="col">
                Category: <strong>{category}</strong>
              </p>
            </div>
            <div className="col-auto">
              <div className="input-group justify-content-end">
                <div className="input-group-text">
                  <strong>{voteCount}</strong>
                </div>
                {liked ? (
                  <button onClick={downVote} className="btn btn-success border">
                    <i className="fa-solid fa-heart fa-xl btn"></i>
                  </button>
                ) : (
                  <button onClick={upvote} className="btn btn-light border">
                    <i className="fa-solid fa-heart fa-xl btn"></i>
                  </button>
                )}
                {/* delete button conditionally rendered */}
                {user === owner ? (
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    className="btn btn-light border"
                  >
                    <i className="text-danger fa-solid fa-square-minus fa-xl "></i>
                  </button>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>
        </div>

        <CommentList />
      </article>

      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              This action is irreversible. Please double check you wish to
              delete this review.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Yes I'm Sure.
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReviewPage;
