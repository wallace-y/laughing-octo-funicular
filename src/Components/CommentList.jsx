import loadingImage from "../assets/tic-tac-toe.gif";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentByReviewId } from "../utils";
import moment from "moment";
import { addComment } from "../utils";
import Error from "./Error";
import CommentCard from "./CommentCard";

function CommentList() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

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
      // body: event.target.review_body.value,
      body: newComment,
      username: "cooljmessy",
    };
    setComments((currentList) => {
      let oldList = [...currentList];
      review.author = review.username;
      if (currentList.length > 0) {
        review.comment_id = oldList[oldList.length - 1].comment_id + 1;
      } else {
        review.comment_id = 1;
      }
      return [review, ...oldList];
    });
    setError(null);
    addComment(review_id, review).catch((err) => {
      if (err) {
        setError("There was a problem adding your comment. Please try again.");
      }
    });
    setNewComment("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  if (loading) {
    return (
      <main className="text-center mt-5">
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
      <main className="container bg-light mt-5 pb-1">
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
        <form onSubmit={handleSubmit} className="form-group input-group mb-3">
          <textarea
            required
            name="review_body"
            className="form-control"
            placeholder="What do you think?"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            onKeyUp={handleKeyPress}
          ></textarea>
          <button className="btn btn-outline-secondary">
            <i className="fa-solid fa-comment btn"></i>
          </button>
        </form>
      </main>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <main className="container mt-5">
      <h2 className="text-center">Join the conversation...</h2>
      <form onSubmit={handleSubmit} className="form-group input-group mb-3">
        <textarea
          required
          name="review_body"
          className="form-control"
          placeholder="What do you think?"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          onKeyUp={handleKeyPress}
        ></textarea>
        <button className="btn btn-light border">
          <i className="fa-solid fa-comment fa-xl"></i>
        </button>
      </form>
      <ul className="list-group ">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
      <div className="text-center mt-5">
        <a
          className="link-dark"
          href="https://www.flaticon.com/free-animated-icons/loading"
          title="loading animated icons"
        >
          Loading animated icons created by Freepik - Flaticon
        </a>
      </div>
    </main>
  );
}

export default CommentList;
