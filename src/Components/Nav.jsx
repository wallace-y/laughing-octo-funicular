import { Link } from "react-router-dom";
import ReviewSearch from "./ReviewSearch";
import CurrentUser from "./CurrentUser";

function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">Board Game Reviews</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/reviews"
                className="nav-link active"
                aria-current="page"
              >
                Browse All Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" aria-current="page">
                Browse All Categories
              </Link>
            </li>
          </ul>
          <ReviewSearch />
          <CurrentUser />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
