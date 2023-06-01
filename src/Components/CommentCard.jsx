import moment from "moment";
import { useState } from "react";
import { upvoteComment, deleteComment } from "../utils";

function CommentCard({ comment }) {
  const { comment_id, votes, created_at, author, body } = comment;
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);

  function upvote() {
    setVoteCount((currentCount) => currentCount + 1);
    setError(null);
    setLiked(true);
    upvoteComment(comment_id, 1).catch((err) => {
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
    upvoteComment(comment_id, -1).catch((err) => {
      if (err) {
        setVoteCount((currentCount) => currentCount + 1);
        setError("Something went wrong, please try again.");
        setLiked(true);
      }
    });
  }

  function handleDelete() {
    setDeleted(true);
    setError(null);
    deleteComment(comment_id).catch((err) => {
      if (err) {
        setError("Something went wrong, please try again.");
        setDeleted(false);
      }
    });
  }

  {
    const formattedDate = moment(created_at).format("D MMM YYYY");

    return (
      <>
        {deleted ? (
          <></>
        ) : (
          <li
            key={comment_id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                {author}, {formattedDate}
              </div>
              {body}
            </div>
            {liked ? (
              <button onClick={downVote} className="btn btn-success border">
                <i className="fa-solid fa-thumbs-up fa-xl"></i>
              </button>
            ) : (
              <button onClick={upvote} className="btn btn-light border">
                <i className="fa-solid fa-thumbs-up fa-xl"></i>
              </button>
            )}
            <button onClick={handleDelete} className="btn btn-light border">
              <i className="text-danger fa-solid fa-square-minus fa-xl"></i>
            </button>
            <span className="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle">
              {voteCount}
            </span>
          </li>
        )}
      </>
    );
  }
}

export default CommentCard;
