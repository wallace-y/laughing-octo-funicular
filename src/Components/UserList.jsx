import loadingImage from "../assets/tic-tac-toe.gif";
import { useEffect, useState } from "react";
import { getAllUsers } from "../utils";
import Error from "./Error";
import { Link } from "react-router-dom";

function ReviewsList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get all users
  useEffect(() => {
    getAllUsers()
      .then((userData) => {
        setUsers(userData);
        setLoading(false);
        return userData;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

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

  if (error) {
    return <Error message={error} />;
  }

  return (
    <main className="m-5">
      <h1 className="text-center mt-5">All Users</h1>
      <div className="d-flex justify-content-center">
        <ul className="list-group">
          {users.map((user) => {
            return (
              <Link
                to={`/users/${user.username}`}
                key={user.username}
                className="list-group-item"
              >
                <div className="d-flex align-items-center">
                  <img
                    className="img-thumbnail shadow"
                    src={`${user.avatar_url}`}
                    alt="user avatar logo"
                    style={{ clipPath: "circle()", width: "50px" }}
                  ></img>
                  <div className="ms-2 me-auto">{user.username}</div>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default ReviewsList;
