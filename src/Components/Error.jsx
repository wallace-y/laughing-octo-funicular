import { Link } from "react-router-dom";
import errorImage from "../assets/game-over.gif";

function Error({ message }) {
  console.log(message);
  return (
    <div className="text-center mt-5">
      <h1 className="">{message}</h1>
      <div>
        {" "}
        <img
          style={{ width: "200px" }}
          src={errorImage}
          alt="error-image-for-broken-routes"
        ></img>
      </div>
      <div>
        <p>
          Look's like something didn't work there.{" "}
          <Link to="/" className="link-dark">
            {" "}
            Head Home
          </Link>
        </p>
      </div>

      <a
        className="text-dark"
        href="https://www.flaticon.com/free-animated-icons/game-over"
        title="game over animated icons"
      >
        Game over animated icons created by Freepik - Flaticon
      </a>
    </div>
  );
}

export default Error;
