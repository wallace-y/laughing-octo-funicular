import { Link } from "react-router-dom";
import ReviewSearch from "./ReviewSearch";
import CurrentUser from "./CurrentUser";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark font-monospace">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand my-0 fs-4 d-none d-sm-block">Board Game Reviews</Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul className="navbar-nav me-3 mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/reviews"
                className="nav-link active"
                aria-current="page"
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reviews/new" className="nav-link" aria-current="page">
                Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" aria-current="page">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link" aria-current="page">
                Users
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
