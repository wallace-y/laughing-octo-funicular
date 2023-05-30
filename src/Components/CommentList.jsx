import loadingImage from "../assets/tic-tac-toe.gif";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { getCommentByReviewId } from "../utils";
import moment from "moment";

function CommentList() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommentByReviewId(review_id)
      .then((commentData) => {
        setComments(commentData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <main className="container">
      <p className="text-center">Join the conversation...</p>

      <ul className="list-group ">
        {comments.map((comment) => {
          //format the date
          const formattedDate = moment(comment.created_at).format("D MMM YYYY");

          return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
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
