function SortDropdown({ searchParams, setSearchParams }) {
  const setSortQuery = (selectedSort) => {
    if (selectedSort === "") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("sort_by");
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort_by", selectedSort);
      setSearchParams(newParams);
    }
  };

  return (
    <section>
      <select
        className="form-select"
        id="all-filters"
        onChange={(event) => {
          setSortQuery(event.target.value);
        }}
      >
        <option value="" defaultValue className="text-capitalize">
          No Filter
        </option>
        <option value="review_id" defaultValue className="text-capitalize">
          Id
        </option>
        <option value="title" defaultValue className="text-capitalize">
          Title
        </option>
        <option value="owner" defaultValue className="text-capitalize">
          Owner
        </option>
        <option value="created_at" defaultValue className="text-capitalize">
          Date
        </option>
        <option value="votes" defaultValue className="text-capitalize">
          Votes
        </option>
        <option value="designer" defaultValue className="text-capitalize">
          Designer
        </option>
        <option value="category" defaultValue className="text-capitalize">
          Category
        </option>
        <option value="comment_count" defaultValue className="text-capitalize">
          Comments
        </option>
      </select>
    </section>
  );
}

export default SortDropdown;
