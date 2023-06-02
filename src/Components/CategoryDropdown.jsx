function Dropdown({ categories, searchParams, setSearchParams }) {
  const setFilterCategory = (selectedCategory) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", selectedCategory);
    setSearchParams(newParams);
  };

  return (
    <section>
      <select
        className="form-select"
        id="category-selection"
        onChange={(event) => {
          setFilterCategory(event.target.value);
        }}
      >
        <option value="" defaultValue className="text-capitalize">
          All Categories
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
    </section>
  );
}

export default Dropdown;
