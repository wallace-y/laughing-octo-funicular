import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentByReviewId } from "../utils";
import { addComment } from "../utils";
import Error from "./Error";
import CommentCard from "./CommentCard";
import Loading from "./Loading";

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
  }, [handleSubmit]);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let review = {
      body: newComment,
      username: "cooljmessy",
    };
    setComments((currentList) => {
      let oldList = [...currentList];
      review.author = review.username;

      return [review, ...oldList];
    });
    setError(null);
    addComment(review_id, review)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("There was a problem adding your comment. Please try again.");
      });
    setNewComment("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (comments.length === 0) {
    return (
      <main className="container bg-light mt-5 pb-1">
        <h3 className="text-center pt-3">
          Look like there is nothing here. Why not start the conversation?
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
