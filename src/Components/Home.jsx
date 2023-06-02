import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="px-4 py-5 my-5 text-center font-monospace">
      <h1 className="display-5 fw-bold text-body-emphasis">
        Welcome to board game reviews
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          This application is a fictional site hosting reviews of board games by
          users. Users are able to comment on the reviews and like them if they
          wish.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/reviews" className="btn btn-dark btn-lg px-4 gap-3">
            Browse Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
