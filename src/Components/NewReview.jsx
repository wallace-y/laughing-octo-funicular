import loadingImage from "../assets/tic-tac-toe.gif";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getCategories, postReview } from "../utils";
import Error from "./Error";
import { Link } from "react-router-dom";

function NewReview() {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  // get all categories
  useEffect(() => {
    getCategories()
      .then((categoryData) => {
        setCategories(categoryData);
        return categoryData;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setPosting(true);
    const review = {
      title: event.target.title.value,
      designer: event.target.designer.value,
      owner: event.target.username.value,
      category: event.target.category.value,
      review_img_url: event.target.image.value,
      review_body: event.target.body.value,
    };
    postReview(review)
      .then((res) => {
        setPosting(false);
        setPosted(true);
      })
      .catch((err) => {
        setPosting(false);
        setError(err.message);
      });
  }

  if (error) {
    return <Error message={error} />;
  }

  if (posting) {
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

  if (posted) {
    return (
      <main className="text-center mt-5">
        <h1>Post successfully submitted.</h1>
        <Link to="/reviews" className="link-dark">
          Browse reviews
        </Link>
      </main>
    );
  }

  return (
    <main className="container mt-5">
      <div className="col">
        <h4 className="mb-3">Post a review</h4>
        <form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder=""
                value={user}
                disabled
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="The title for your review..."
                required
              />
              <div className="invalid-feedback">
                Please enter a valid title.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="body" className="form-label">
                Review
              </label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                id="body"
                name="body"
                placeholder="The body of your review"
                required
              ></textarea>
              <div className="invalid-feedback">Please enter your review.</div>
            </div>

            <div className="col-12">
              <label htmlFor="designer" className="form-label">
                Game Designer
              </label>
              <input
                type="text"
                className="form-control"
                id="designer"
                name="designer"
                placeholder="Klaus Teuber"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                placeholder="Please post a URL to the image you wish to use for the review (optional)"
              />
            </div>
            {/* category data */}
            <div className="col-12">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                required
              >
                <option value="" defaultValue className="text-capitalize">
                  Show All Categories
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.slug} className="text-capitalize">
                      {" "}
                      {category.slug}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                Please select a valid category.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-dark btn-lg" type="submit">
            Post review
          </button>
        </form>
      </div>
    </main>
  );
}

export default NewReview;
