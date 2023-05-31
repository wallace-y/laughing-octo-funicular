import moment from "moment";
import { useState } from "react";
import { upvoteComment } from "../utils";

function CommentCard({ comment }) {
  const { comment_id, votes, created_at, author, body } = comment;
  const [liked, setLiked] = useState(false);
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

  {
    const formattedDate = moment(created_at).format("D MMM YYYY");

    return (
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
          <button onClick={downVote} className="btn btn-success">
            <i className="fa-solid fa-thumbs-up fa-xl btn"></i>
          </button>
        ) : (
          <button onClick={upvote} className="btn btn-light">
            <i className="fa-solid fa-thumbs-up fa-xl btn"></i>
          </button>
        )}
        <button className="btn btn-light">
          <i className="fa-solid fa-trash btn"></i>
        </button>
        <span className="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle">
          {voteCount}
        </span>
      </li>
    );
  }
}

export default CommentCard;
