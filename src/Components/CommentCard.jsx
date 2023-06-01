import moment from "moment";
import inProgressImage from "../assets/loading.gif";
import Error from "./Error";
import { useState, useContext } from "react";
import { upvoteComment, deleteComment } from "../utils";
import { UserContext } from "../contexts/User";

function CommentCard({ comment }) {
  const { comment_id, votes, created_at, author, body } = comment;
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [inProgress, setInProgress] = useState(false);
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
    setInProgress(true);
    setError(null);
    deleteComment(comment_id)
      .then(() => {
        setDeleted(true);
        setInProgress(false);
      })
      .catch((err) => {
        if (err) {
          setError("Look's like something went wrong. Please refresh and try again.");
          setDeleted(false);
        }
      });
  }

  if (error) {
    return <Error message={error} />;
  }

  {
    const formattedDate = moment(created_at).format("D MMM YYYY");

    return (
      <>
        {deleted ? (
          <></>
        ) : (
          <>
            {inProgress ? (
              <main className="text-center mt-5">
                <img
                  style={{ width: "50px" }}
                  src={inProgressImage}
                  alt="comment being deleted loading wheel"
                ></img>
              </main>
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
                {/* render like button depending on if liked or not */}
                {liked ? (
                  <button onClick={downVote} className="btn btn-success border">
                    <i className="fa-solid fa-thumbs-up fa-xl"></i>
                  </button>
                ) : (
                  <button onClick={upvote} className="btn btn-light border">
                    <i className="fa-solid fa-thumbs-up fa-xl"></i>
                  </button>
                )}
                {/* conditionally render delete button. If not current user, cannot delete comment */}
                {user === author ? (
                  <button
                    onClick={handleDelete}
                    className="btn btn-light border"
                  >
                    <i className="text-danger fa-solid fa-square-minus fa-xl"></i>
                  </button>
                ) : (
                  <></>
                )}

                <span className="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle">
                  {voteCount}
                </span>
              </li>
            )}
          </>
        )}
      </>
    );
  }
}

export default CommentCard;
