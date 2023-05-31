import loadingImage from "../assets/tic-tac-toe.gif";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentByReviewId } from "../utils";
import moment from "moment";
import { addComment } from "../utils";
import Error from "./Error";

function CommentList() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentByReviewId(review_id)
      .then((commentData) => {
        setComments(commentData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let review = {
      body: event.target.review_body.value,
      username: "cooljmessy",
    };
    setComments((currentList) => {
      let oldList = [...currentList];
      review.author = review.username;
      review.comment_id = oldList[oldList.length - 1].comment_id + 1;
      return [review, ...oldList];
    });
    setError(null);
    addComment(review_id, review).catch((err) => {
      if (err) {
        setError("There was a problem adding your comment. Please try again.");
      }
    });
    event.target.review_body.value = "";
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

  if (comments.length === 0) {
    return (
      <main className="container bg-light">
        <h3 className="text-center">
          Look like there is nothing here. Why not start the conversation!
        </h3>
        <h4 className="text-center">Top tips for commenting</h4>
        <ul>
          <li>
            Comments are a great way to give feedback, ask questions, and
            interact with other users
          </li>
          <li>
            Comments should be specific and relevant to the review you're
            interacting with
          </li>
          <li>
            Be kind. We all love games that's why we're here. If you don't agree
            with someone's opinion, consider writing your own review!
          </li>
        </ul>
      </main>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <main className="container">
      <p className="text-center">Join the conversation...</p>
      <form onSubmit={handleSubmit} className="form-group input-group mb-3">
        <textarea
          required
          name="review_body"
          className="form-control"
          placeholder="What do you think?"
        ></textarea>
        <button className="btn btn-outline-secondary">
          <i className="fa-solid fa-comment btn"></i>
        </button>
      </form>
      <ul className="list-group ">
        {comments.map((comment) => {
          const formattedDate = moment(comment.created_at).format("D MMM YYYY");

          return (
            <li
              key={comment.comment_id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {comment.author}, {formattedDate}
                </div>
                {comment.body}
              </div>
              <button>
                <i className="fa-solid fa-thumbs-up btn"></i>
              </button>
              <button>
                <i className="fa-solid fa-trash btn"></i>
              </button>
              <span className="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle">
                {comment.votes}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default CommentList;
