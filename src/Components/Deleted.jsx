import { Link } from "react-router-dom";

function Deleted() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">
        Review successfully deleted.
      </h1>
      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/reviews" className="btn btn-dark btn-lg px-4 gap-3">
            Browse Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Deleted;
